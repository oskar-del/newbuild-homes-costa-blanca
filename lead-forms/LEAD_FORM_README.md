# Lead Form Components

## Setup Instructions

### 1. Copy the files to your project:

```
src/components/LeadForm.tsx      → Main form component
src/components/CTASection.tsx    → Full-width CTA section
src/components/SidebarLeadForm.tsx → Compact sidebar form
src/app/contact/page.tsx         → Updated contact page
```

### 2. Enable Netlify Forms

Netlify Forms works automatically, but you need to add a hidden form to your HTML 
so Netlify can detect it at build time. Add this to `src/app/layout.tsx` inside the `<body>`:

```tsx
{/* Hidden form for Netlify detection - add after <Header /> */}
<form name="lead-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="tel" name="phone" />
  <textarea name="message" />
  <input type="text" name="property-interest" />
</form>
<form name="sidebar-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="tel" name="phone" />
  <input type="text" name="property-interest" />
</form>
```

### 3. Configure Email Notifications

After deploying:
1. Go to Netlify Dashboard → Your site → Forms
2. Click on "lead-inquiry" form
3. Go to Settings & Usage → Form notifications
4. Add email notification to: oskar@hanssonhertzell.com

---

## Usage Examples

### On Contact Page
Already integrated - just replace your existing contact page.

### On Development Pages
Add the CTA section at the bottom and/or sidebar form:

```tsx
// At top of file
import CTASection from '@/components/CTASection';
import SidebarLeadForm from '@/components/SidebarLeadForm';

// In your development page component:
export default function DevelopmentPage({ data }) {
  return (
    <div>
      {/* Your existing content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main content */}
        </div>
        
        {/* Sidebar with lead form */}
        <div className="lg:col-span-1">
          <SidebarLeadForm
            propertyName={data.projectName}
            price={data.property.price}
            reference={data.property.ref}
          />
        </div>
      </div>

      {/* Full CTA section at bottom */}
      <CTASection
        propertyName={data.projectName}
        title={`Interested in ${data.projectName}?`}
        subtitle="Contact us for more information, floor plans, or to arrange a viewing."
      />
    </div>
  );
}
```

### On Area Guide Pages
```tsx
import CTASection from '@/components/CTASection';

export default function AreaGuidePage() {
  return (
    <div>
      {/* Area guide content */}
      
      <CTASection
        title="Find Your Dream Home in [Area Name]"
        subtitle="Let us help you discover the best new build properties in this area."
      />
    </div>
  );
}
```

### Standalone Form Anywhere
```tsx
import LeadForm from '@/components/LeadForm';

<LeadForm
  propertyInterest="Golf Properties"
  title="Get Golf Property Updates"
  subtitle="Be the first to know about new golf developments"
/>
```

---

## Component Props

### LeadForm
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| propertyInterest | string | '' | Pre-fills property dropdown (hidden if set) |
| title | string | 'Get More Information' | Form title |
| subtitle | string | 'Leave your details...' | Form subtitle |
| compact | boolean | false | Removes message field for sidebars |
| formName | string | 'lead-inquiry' | Netlify form name |

### CTASection
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| propertyName | string | undefined | Pre-fills form property field |
| title | string | 'Ready to Learn More?' | Section title |
| subtitle | string | 'Get in touch...' | Section subtitle |
| variant | 'light' \| 'blue' \| 'white' | 'light' | Background style |

### SidebarLeadForm
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| propertyName | string | required | Property name for form |
| price | number | undefined | Display price in header |
| reference | string | undefined | Property reference |

---

## Testing Locally

Netlify Forms won't work in local development. To test:
1. Deploy to Netlify (even draft deploy works)
2. Submit a test form
3. Check Netlify Dashboard → Forms

Or use the Netlify CLI:
```bash
netlify dev
```

---

## Future Enhancements

When ready to add more features:
- **Airtable integration**: Add API route to also save to Airtable
- **Slack notifications**: Add webhook for instant team alerts
- **Auto-responder**: Set up email auto-reply to leads
- **Lead scoring**: Track which properties get most inquiries
