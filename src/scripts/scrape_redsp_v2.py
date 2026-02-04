#!/usr/bin/env python3
"""
REDSP Property Scraper v2
Uses only requests library - no browser automation
"""

import requests
import json
import csv
import os
import re
import getpass
from datetime import datetime
from urllib.parse import urljoin

def slugify(text):
    """Convert text to URL-friendly slug"""
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text

def main():
    print("\n" + "=" * 50)
    print("🏠 REDSP PROPERTY SCRAPER v2")
    print("=" * 50 + "\n")
    
    # Get credentials
    print("📧 Enter your REDSP login details:\n")
    email = input("   Email: ").strip()
    password = getpass.getpass("   Password: ")
    
    print("\n🚀 Starting scraper...\n")
    
    # Create session
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    })
    
    base_url = "https://admin.redsp.net"
    
    # Step 1: Get login page (for CSRF token if needed)
    print("   📡 Connecting to REDSP...")
    try:
        login_page = session.get(f"{base_url}/login", timeout=30)
        print(f"   ✅ Connected (status: {login_page.status_code})")
    except Exception as e:
        print(f"   ❌ Connection failed: {e}")
        return
    
    # Step 2: Try to login
    print("   🔐 Logging in...")
    
    login_data = {
        'email': email,
        'password': password,
        '_token': '',  # Will try to extract from page
    }
    
    # Try to find CSRF token
    csrf_match = re.search(r'name="_token"\s+value="([^"]+)"', login_page.text)
    if csrf_match:
        login_data['_token'] = csrf_match.group(1)
        print("   ✅ Found CSRF token")
    
    try:
        login_response = session.post(
            f"{base_url}/login",
            data=login_data,
            timeout=30,
            allow_redirects=True
        )
        
        # Check if login worked
        if 'dashboard' in login_response.url or 'properties' in login_response.url.lower():
            print("   ✅ Login successful!")
        elif 'login' in login_response.url:
            print("   ❌ Login failed - check credentials")
            print(f"   URL after login: {login_response.url}")
            return
        else:
            print(f"   ⚠️ Redirected to: {login_response.url}")
            print("   Attempting to continue...")
            
    except Exception as e:
        print(f"   ❌ Login error: {e}")
        return
    
    # Step 3: Navigate to properties
    print("\n   📋 Fetching properties page...")
    
    properties_url = f"{base_url}/properties"
    
    try:
        props_response = session.get(properties_url, timeout=30)
        print(f"   ✅ Properties page loaded (status: {props_response.status_code})")
    except Exception as e:
        print(f"   ❌ Failed to load properties: {e}")
        return
    
    # Step 4: Parse properties
    # This depends on how the page is structured - may need adjustment
    
    html = props_response.text
    
    # Try to find data in the page
    # Look for JSON data or table rows
    
    properties = []
    developers = {}
    developments = {}
    
    # Try to find a JavaScript data object
    json_match = re.search(r'var\s+properties\s*=\s*(\[[\s\S]*?\]);', html)
    if json_match:
        try:
            properties = json.loads(json_match.group(1))
            print(f"   ✅ Found {len(properties)} properties in JSON")
        except:
            pass
    
    # If no JSON, try parsing HTML table
    if not properties:
        print("   📊 Parsing HTML table...")
        
        # Find table rows
        row_pattern = r'<tr[^>]*>([\s\S]*?)</tr>'
        cell_pattern = r'<td[^>]*>([\s\S]*?)</td>'
        
        rows = re.findall(row_pattern, html, re.IGNORECASE)
        print(f"   Found {len(rows)} table rows")
        
        for row in rows:
            cells = re.findall(cell_pattern, row, re.IGNORECASE)
            if len(cells) >= 4:
                # Clean cell content
                clean_cells = []
                for cell in cells:
                    # Remove HTML tags
                    clean = re.sub(r'<[^>]+>', '', cell)
                    clean = clean.strip()
                    clean_cells.append(clean)
                
                # Try to identify columns
                # This is a guess - may need adjustment based on actual table structure
                if clean_cells[0] and not clean_cells[0].startswith('ID') and not clean_cells[0].startswith('#'):
                    prop = {
                        'reference': clean_cells[0] if len(clean_cells) > 0 else '',
                        'developer': clean_cells[1] if len(clean_cells) > 1 else '',
                        'development': clean_cells[2] if len(clean_cells) > 2 else '',
                        'town': clean_cells[3] if len(clean_cells) > 3 else '',
                        'zone': clean_cells[4] if len(clean_cells) > 4 else '',
                        'province': clean_cells[5] if len(clean_cells) > 5 else '',
                        'price': clean_cells[6] if len(clean_cells) > 6 else '',
                    }
                    if prop['reference']:
                        properties.append(prop)
    
    if not properties:
        print("\n   ⚠️ Could not automatically parse properties.")
        print("   The page structure may be different than expected.")
        print("\n   Saving raw HTML for inspection...")
        
        # Save HTML for manual inspection
        with open('redsp_page.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("   📄 Saved to: redsp_page.html")
        print("\n   Please upload this file so I can analyze the structure.")
        return
    
    # Step 5: Build mapping structures
    print(f"\n   📊 Processing {len(properties)} properties...")
    
    for prop in properties:
        dev_name = prop.get('developer', '').strip()
        dev_name_upper = dev_name.upper() if dev_name else 'UNKNOWN'
        
        development_name = prop.get('development', '').strip()
        development_name_upper = development_name.upper() if development_name else 'UNKNOWN'
        
        ref = prop.get('reference', '').strip()
        town = prop.get('town', '').strip()
        zone = prop.get('zone', '').strip()
        province = prop.get('province', '').strip()
        
        # Build developers dict
        if dev_name_upper not in developers:
            developers[dev_name_upper] = {
                'name': dev_name or dev_name_upper,
                'slug': slugify(dev_name or dev_name_upper),
                'developments': [],
                'propertyCount': 0,
                'propertyRefs': []
            }
        
        if development_name_upper and development_name_upper not in developers[dev_name_upper]['developments']:
            developers[dev_name_upper]['developments'].append(development_name_upper)
        
        developers[dev_name_upper]['propertyCount'] += 1
        if ref:
            developers[dev_name_upper]['propertyRefs'].append(ref)
        
        # Build developments dict
        if development_name_upper not in developments:
            developments[development_name_upper] = {
                'name': development_name or development_name_upper,
                'slug': slugify(development_name or development_name_upper),
                'developer': dev_name_upper,
                'developerSlug': slugify(dev_name or dev_name_upper),
                'town': town,
                'zone': zone,
                'province': province,
                'propertyCount': 0,
                'propertyRefs': []
            }
        
        developments[development_name_upper]['propertyCount'] += 1
        if ref:
            developments[development_name_upper]['propertyRefs'].append(ref)
    
    # Step 6: Save results
    print("\n💾 Saving results...")
    
    # Create output directory
    output_dir = os.path.join('src', 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    # Build final output
    output = {
        'scraped_at': datetime.now().isoformat(),
        'stats': {
            'total_properties': len(properties),
            'total_developers': len(developers),
            'total_developments': len(developments)
        },
        'developers': developers,
        'developments': developments,
        'properties': properties
    }
    
    # Save JSON
    json_path = os.path.join(output_dir, 'property-mapping.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"   ✅ Saved: {json_path}")
    
    # Save CSV
    csv_path = os.path.join(output_dir, 'properties.csv')
    if properties:
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=properties[0].keys())
            writer.writeheader()
            writer.writerows(properties)
        print(f"   ✅ Saved: {csv_path}")
    
    # Print summary
    print("\n" + "=" * 50)
    print("✅ SCRAPING COMPLETE!")
    print("=" * 50)
    print(f"\n📊 Summary:")
    print(f"   • Properties: {len(properties)}")
    print(f"   • Developers: {len(developers)}")
    print(f"   • Developments: {len(developments)}")
    print(f"\n📁 Files saved to: {output_dir}/")
    print("\n🎉 Done! Upload property-mapping.json to Claude.")

if __name__ == '__main__':
    main()
