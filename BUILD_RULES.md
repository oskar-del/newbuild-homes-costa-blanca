# BUILD RULES - MANDATORY FOR EVERY FILE

**READ THIS BEFORE CREATING ANY CODE**

## The Mission
XML feed → AI-unique content → Schema-rich pages → SEO traffic → Leads

## Critical Understanding
1. XML feed text is DUPLICATE across 50+ agent sites
2. ALL content must be AI-transformed to be unique
3. Every page needs FULL schema hierarchy
4. This is a lead-gen site - visitors must CONTACT for pricing/location

---

## CTAs - EXACT LINKS (Use These Always)

**Primary CTA (Green, Prominent):**
WhatsApp: https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0

**Secondary CTA:**
Phone: +34 634 044 970

**Mortgage CTA:**
Habeno: https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e

---

## PAGE REQUIREMENTS CHECKLIST

### Every Page MUST Have:
- [ ] generateMetadata() with unique title (50-60 chars)
- [ ] generateMetadata() with unique description (150-160 chars)
- [ ] export const revalidate = 3600
- [ ] BreadcrumbList schema
- [ ] FAQPage schema (minimum 5 questions)
- [ ] Primary schema for page type
- [ ] WhatsApp CTA visible
- [ ] All images have AI-generated alt tags

### Development Pages: ApartmentComplex + RealEstateListing + FAQPage + BreadcrumbList
### Builder Pages: Organization + FAQPage + BreadcrumbList
### Area Pages: Place + FAQPage + BreadcrumbList
### Golf Pages: GolfCourse + FAQPage + BreadcrumbList

---

## SCHEMA: FAQPage (Voice Optimized)
Answers MUST start with direct statement: "Yes, foreigners can buy..." NOT "There are many considerations..."

## SCHEMA: ScheduleAction (Book Viewing in Google)
Every development page needs potentialAction with ScheduleAction type.

## MAP STRATEGY
Show area-level only, NOT exact pin. Forces contact for location = leads.

## INTERNAL LINKING
Auto-link first occurrence of areas, builders, golf courses. Max 3-5 per 1000 words.

## NEVER LINK TO
Idealista, Kyero, Fotocasa, or any competing portal.

---

## AI CONTENT REQUIREMENTS

- Development pages: 800-1500 words, 5-8 FAQs
- Builder pages: 500-800 words, 5 FAQs  
- Area pages: 1500-2500 words, 8-10 FAQs
- Golf pages: 800-1200 words, 5-8 FAQs

NEVER use raw feed text. Always AI-transform.

---

## BEFORE COMMIT
Run: node scripts/verify-build.js
