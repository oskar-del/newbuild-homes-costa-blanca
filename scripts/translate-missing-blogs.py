#!/usr/bin/env python3
"""
Translate missing blog articles using Claude API.
Reads English articles and translates to target languages.
"""
import json
import os
import sys
import time
import anthropic

BASE_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'articles')

# All missing translations: (filename, [languages])
MISSING = [
    ("dutch-box-3-tax-reform-spanish-property-investment.json", ["sv", "de", "fr", "no", "pl", "ru"]),
    # NL and NL-BE get special treatment - they already have a Dutch-native version
    ("dutch-box-3-tax-reform-spanish-property-investment.json", ["nl", "nl-be"]),
    ("british-healthcare-spain-guide.json", ["sv"]),
    ("ciudad-quesada-property-guide.json", ["pl"]),
    ("dutch-investment-laws-spain-2026.json", ["nl"]),
    ("flights-uk-alicante-routes.json", ["ru"]),
    ("international-schools-costa-blanca.json", ["pl"]),
    ("living-in-spain-practical-guide.json", ["pl"]),
    ("los-balcones-property-guide.json", ["sv"]),
    ("luxury-new-build-villas-costa-blanca-500k-plus.json", ["sv"]),
    ("luxury-property-costa-blanca.json", ["sv"]),
    ("medium-term-rental-spain.json", ["sv"]),
    ("modelo-720-foreign-assets-spain.json", ["sv"]),
    ("moraira-property-guide.json", ["sv"]),
    ("new-build-apartments-under-200k-costa-blanca.json", ["sv"]),
    ("non-resident-tax-spain-property.json", ["no"]),
    ("polish-buyers-affordable-living.json", ["nl-be"]),
    ("power-of-attorney-spain-guide.json", ["nl-be"]),
    ("property-management-costa-blanca.json", ["no"]),
    ("property-price-forecast-costa-blanca-2027.json", ["no"]),
    ("retiring-spain-planning-guide.json", ["nl-be"]),
    ("russian-buyers-costa-blanca.json", ["nl-be"]),
    ("spain-property-bubble-analysis.json", ["pl"]),
    ("spanish-property-lawyer-guide.json", ["de"]),
    ("squatters-spain-new-builds.json", ["pl"]),
    ("top-10-new-build-developers-costa-blanca.json", ["ru"]),
    ("top-10-restaurants-torrevieja.json", ["nl"]),
    ("top-10-things-to-do-orihuela-costa.json", ["nl"]),
    ("villaitana-golf-benidorm.json", ["nl"]),
    ("why-javea-so-popular.json", ["ru"]),
    ("benissa-super-guide.json", ["fr"]),
]

LANG_NAMES = {
    "sv": "Swedish", "de": "German", "nl": "Dutch", "nl-be": "Belgian Dutch (Flemish)",
    "fr": "French", "no": "Norwegian", "pl": "Polish", "ru": "Russian"
}

LANG_LABELS = {
    "sv": "min läsning", "de": "Min. Lesezeit", "nl": "min leestijd",
    "nl-be": "min leestijd", "fr": "min de lecture", "no": "min lesning",
    "pl": "min czytania", "ru": "мин чтения"
}

def translate_article(client, article_data, target_lang):
    """Translate an article's text fields to target language."""
    lang_name = LANG_NAMES[target_lang]

    # Extract translatable text
    translatable = {
        "title": article_data.get("title", ""),
        "excerpt": article_data.get("excerpt", ""),
        "tags": article_data.get("tags", []),
    }

    content = article_data.get("content", {})
    if isinstance(content, dict):
        translatable["quickAnswer"] = content.get("quickAnswer", "")
        translatable["intro"] = content.get("intro", "")
        translatable["conclusion"] = content.get("conclusion", "")
        translatable["sections"] = content.get("sections", [])
        translatable["faqs"] = content.get("faqs", [])
        # Property showcase text
        showcases = content.get("propertyShowcases", [])
        showcase_text = []
        for s in showcases:
            showcase_text.append({
                "title": s.get("title", ""),
                "subtitle": s.get("subtitle", ""),
                "ctaText": s.get("ctaText", ""),
                "properties": [
                    {"title": p.get("title", ""), "location": p.get("location", ""),
                     "features": p.get("features", []), "badge": p.get("badge", "")}
                    for p in s.get("properties", [])
                ]
            })
        translatable["showcaseText"] = showcase_text
    elif isinstance(content, str):
        translatable["content_string"] = content

    prompt = f"""Translate the following real estate blog article content from English to {lang_name}.

CRITICAL RULES:
- Translate ALL text naturally and fluently — this should read like it was written by a native {lang_name} speaker
- Keep proper nouns (place names like Javea, Moraira, Costa Blanca) unchanged
- Keep technical terms like NIE, IBI, Box 3 unchanged
- Keep numbers, prices, percentages unchanged
- Keep markdown formatting (**, -, ##) unchanged
- Keep the same JSON structure — return valid JSON only
- Do NOT translate: slug, reference codes, URLs, image paths
- For tags: translate each tag naturally

Return ONLY a valid JSON object with the same keys as the input, translated to {lang_name}:

{json.dumps(translatable, ensure_ascii=False)}"""

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )

        result_text = response.content[0].text.strip()
        # Clean up potential markdown wrapping
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
        result_text = result_text.strip()

        translated = json.loads(result_text)
        return translated
    except json.JSONDecodeError as e:
        print(f"  JSON parse error: {e}")
        return None
    except Exception as e:
        print(f"  API error: {e}")
        return None


def build_translated_article(original, translated_fields, target_lang):
    """Merge translated fields back into the full article structure."""
    result = json.loads(json.dumps(original))  # Deep copy

    result["title"] = translated_fields.get("title", original["title"])
    result["excerpt"] = translated_fields.get("excerpt", original["excerpt"])

    # Update metaTitle/metaDescription based on translated title/excerpt
    if "metaTitle" in result:
        result["metaTitle"] = translated_fields.get("title", result["metaTitle"])
    if "metaDescription" in result:
        result["metaDescription"] = translated_fields.get("excerpt", result["metaDescription"])

    result["tags"] = translated_fields.get("tags", original.get("tags", []))

    content = original.get("content", {})
    if isinstance(content, dict):
        new_content = json.loads(json.dumps(content))
        if "quickAnswer" in translated_fields:
            new_content["quickAnswer"] = translated_fields["quickAnswer"]
        if "intro" in translated_fields:
            new_content["intro"] = translated_fields["intro"]
        if "conclusion" in translated_fields:
            new_content["conclusion"] = translated_fields["conclusion"]
        if "sections" in translated_fields:
            new_content["sections"] = translated_fields["sections"]
        if "faqs" in translated_fields:
            new_content["faqs"] = translated_fields["faqs"]

        # Merge showcase translations back
        if "showcaseText" in translated_fields and "propertyShowcases" in new_content:
            for i, st in enumerate(translated_fields["showcaseText"]):
                if i < len(new_content["propertyShowcases"]):
                    showcase = new_content["propertyShowcases"][i]
                    showcase["title"] = st.get("title", showcase.get("title", ""))
                    showcase["subtitle"] = st.get("subtitle", showcase.get("subtitle", ""))
                    showcase["ctaText"] = st.get("ctaText", showcase.get("ctaText", ""))
                    for j, pt in enumerate(st.get("properties", [])):
                        if j < len(showcase.get("properties", [])):
                            showcase["properties"][j]["title"] = pt.get("title", showcase["properties"][j].get("title", ""))
                            showcase["properties"][j]["location"] = pt.get("location", showcase["properties"][j].get("location", ""))
                            showcase["properties"][j]["features"] = pt.get("features", showcase["properties"][j].get("features", []))
                            showcase["properties"][j]["badge"] = pt.get("badge", showcase["properties"][j].get("badge", ""))

        result["content"] = new_content
    elif isinstance(content, str) and "content_string" in translated_fields:
        result["content"] = translated_fields["content_string"]

    return result


def translate_large_article(client, article_data, target_lang):
    """For large articles, translate in chunks to avoid token limits."""
    lang_name = LANG_NAMES[target_lang]
    content = article_data.get("content", {})

    if not isinstance(content, dict):
        return translate_article(client, article_data, target_lang)

    sections = content.get("sections", [])

    # If article is small enough, translate in one go
    article_json = json.dumps(article_data, ensure_ascii=False)
    if len(article_json) < 15000:
        return translate_article(client, article_data, target_lang)

    print(f"  Large article ({len(article_json)} chars), translating in chunks...")

    # Chunk 1: metadata + intro + quickAnswer
    chunk1_data = {
        "title": article_data.get("title", ""),
        "excerpt": article_data.get("excerpt", ""),
        "tags": article_data.get("tags", []),
        "quickAnswer": content.get("quickAnswer", ""),
        "intro": content.get("intro", ""),
    }

    prompt1 = f"""Translate from English to {lang_name}. Keep place names, technical terms (NIE, IBI, Box 3), numbers, markdown formatting unchanged. Return ONLY valid JSON:

{json.dumps(chunk1_data, ensure_ascii=False)}"""

    try:
        r1 = client.messages.create(model="claude-haiku-4-5-20251001", max_tokens=4000,
                                      messages=[{"role": "user", "content": prompt1}])
        t1 = r1.content[0].text.strip()
        if t1.startswith("```json"): t1 = t1[7:]
        if t1.startswith("```"): t1 = t1[3:]
        if t1.endswith("```"): t1 = t1[:-3]
        chunk1_translated = json.loads(t1.strip())
    except Exception as e:
        print(f"  Chunk 1 error: {e}")
        return None

    # Chunk 2: sections (in pairs)
    translated_sections = []
    for i in range(0, len(sections), 2):
        batch = sections[i:i+2]
        prompt_s = f"""Translate these article sections from English to {lang_name}. Keep place names, technical terms, numbers, markdown formatting unchanged. Return ONLY a valid JSON array:

{json.dumps(batch, ensure_ascii=False)}"""

        try:
            rs = client.messages.create(model="claude-haiku-4-5-20251001", max_tokens=6000,
                                          messages=[{"role": "user", "content": prompt_s}])
            ts = rs.content[0].text.strip()
            if ts.startswith("```json"): ts = ts[7:]
            if ts.startswith("```"): ts = ts[3:]
            if ts.endswith("```"): ts = ts[:-3]
            batch_translated = json.loads(ts.strip())
            translated_sections.extend(batch_translated)
            print(f"    Sections {i+1}-{min(i+2, len(sections))}/{len(sections)} done")
        except Exception as e:
            print(f"    Section batch error: {e}")
            translated_sections.extend(batch)  # Keep English as fallback

        time.sleep(0.5)

    # Chunk 3: conclusion + FAQs + showcase text
    chunk3_data = {
        "conclusion": content.get("conclusion", ""),
        "faqs": content.get("faqs", []),
    }
    showcases = content.get("propertyShowcases", [])
    showcase_text = []
    for s in showcases:
        showcase_text.append({
            "title": s.get("title", ""),
            "subtitle": s.get("subtitle", ""),
            "ctaText": s.get("ctaText", ""),
            "properties": [
                {"title": p.get("title", ""), "location": p.get("location", ""),
                 "features": p.get("features", []), "badge": p.get("badge", "")}
                for p in s.get("properties", [])
            ]
        })
    chunk3_data["showcaseText"] = showcase_text

    prompt3 = f"""Translate from English to {lang_name}. Keep place names, technical terms, numbers, markdown formatting unchanged. Return ONLY valid JSON:

{json.dumps(chunk3_data, ensure_ascii=False)}"""

    try:
        r3 = client.messages.create(model="claude-haiku-4-5-20251001", max_tokens=6000,
                                      messages=[{"role": "user", "content": prompt3}])
        t3 = r3.content[0].text.strip()
        if t3.startswith("```json"): t3 = t3[7:]
        if t3.startswith("```"): t3 = t3[3:]
        if t3.endswith("```"): t3 = t3[:-3]
        chunk3_translated = json.loads(t3.strip())
    except Exception as e:
        print(f"  Chunk 3 error: {e}")
        chunk3_translated = chunk3_data

    # Merge all chunks
    merged = {
        **chunk1_translated,
        "sections": translated_sections,
        **chunk3_translated,
    }

    return merged


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        # Try reading from .env.local
        env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
        if os.path.exists(env_path):
            with open(env_path) as f:
                for line in f:
                    if line.startswith("ANTHROPIC_API_KEY="):
                        api_key = line.strip().split("=", 1)[1]
                        break

    if not api_key:
        print("ERROR: No ANTHROPIC_API_KEY found")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    total_jobs = sum(len(langs) for _, langs in MISSING)
    completed = 0
    errors = 0

    print(f"Starting translation of {total_jobs} missing blog articles...")
    print(f"Base dir: {os.path.abspath(BASE_DIR)}")
    print()

    for filename, langs in MISSING:
        en_path = os.path.join(BASE_DIR, filename)
        if not os.path.exists(en_path):
            # Try without .json extension variations
            alt_name = filename.replace("power-of-attorney-spain-guide", "power-of-attorney-spain-property")
            en_path = os.path.join(BASE_DIR, alt_name)
            if not os.path.exists(en_path):
                print(f"SKIP: {filename} not found in English articles")
                completed += len(langs)
                continue

        with open(en_path) as f:
            article = json.load(f)

        for lang in langs:
            lang_dir = os.path.join(BASE_DIR, lang)
            os.makedirs(lang_dir, exist_ok=True)

            output_path = os.path.join(lang_dir, filename)
            if os.path.exists(output_path):
                print(f"SKIP: {lang}/{filename} already exists")
                completed += 1
                continue

            completed += 1
            print(f"[{completed}/{total_jobs}] Translating {filename} → {lang} ({LANG_NAMES[lang]})")

            translated_fields = translate_large_article(client, article, lang)

            if translated_fields:
                full_article = build_translated_article(article, translated_fields, lang)

                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(full_article, f, ensure_ascii=False, indent=2)

                # Verify JSON is valid
                try:
                    with open(output_path) as f:
                        json.load(f)
                    print(f"  ✓ Saved {lang}/{filename}")
                except json.JSONDecodeError:
                    print(f"  ✗ Invalid JSON, removing {lang}/{filename}")
                    os.remove(output_path)
                    errors += 1
            else:
                print(f"  ✗ Translation failed for {lang}/{filename}")
                errors += 1

            time.sleep(1)  # Rate limiting

    print(f"\n{'='*50}")
    print(f"DONE: {completed - errors} translated, {errors} errors")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
