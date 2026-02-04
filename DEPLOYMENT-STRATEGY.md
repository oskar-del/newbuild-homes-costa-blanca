# Deployment Strategy - New Build Homes Costa Blanca

## Current Status
- **Platform**: Netlify with Next.js plugin
- **Property Feeds**: 3 active feeds (REDSP primary, Background Properties, Miralbo)
- **Current Live Site**: https://newbuildhomescostablanca.com (partial deployment)

---

## Phased Deployment Approach

### Why Phase by Area?
1. **Reduce Risk**: Catch issues early before full rollout
2. **Quality Control**: Ensure each area looks polished
3. **SEO Strategy**: Build authority incrementally
4. **Content Review**: Time to verify property data accuracy

---

## Phase 1: Torrevieja Focus (RECOMMENDED FIRST)

### What to Deploy:
- ✅ **Area Page**: `/areas/torrevieja`
- ✅ **Properties**: All Torrevieja properties from feed
- ✅ **Developments**: Torrevieja-based developments
- ✅ **Builders**: Builders active in Torrevieja area
- ✅ **Golf Nearby**: Lo Romero, La Marquesa (close to Torrevieja)

### Checklist Before Deployment:

#### 1. Environment Variables (Netlify Dashboard)
```
NEXT_PUBLIC_SITE_URL=https://newbuildhomescostablanca.com
AIRTABLE_API_KEY=<your_key>
AIRTABLE_BASE_ID=<your_base_id>
AIRTABLE_TABLE_NAME=Leads
NEXT_PUBLIC_GTM_ID=<your_gtm_id>
```

#### 2. Remove Security Risk
⚠️ **CRITICAL**: Ensure `NODE_TLS_REJECT_UNAUTHORIZED=0` is NOT set in Netlify production environment.

#### 3. Content Verification
- [ ] Torrevieja area page content is accurate
- [ ] Property images load correctly
- [ ] Prices are displaying properly
- [ ] Contact forms work (test submission)
- [ ] WhatsApp links work

#### 4. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify OG images work (use https://opengraph.xyz/)
- [ ] Test page speed (aim for 90+ on mobile)

### Deployment Steps:
```bash
# 1. Build locally first to catch errors
npm run build

# 2. If using Netlify CLI
netlify deploy --prod

# Or: Push to main branch if auto-deploy is configured
git push origin main
```

---

## Phase 2: Costa Blanca South Expansion

### After Torrevieja is confirmed working, add:

| Area | Priority | Notes |
|------|----------|-------|
| Orihuela Costa | High | High demand area, many developments |
| Guardamar del Segura | High | Popular beach town |
| Villamartin | High | Golf area, premium market |
| Ciudad Quesada | Medium | Good rental market |
| Pilar de la Horadada | Medium | Border town, growing market |
| San Miguel de Salinas | Medium | Inland value properties |

### Golf Courses to Add:
- Villamartin Golf
- Las Ramblas Golf
- La Finca Golf
- Vistabella Golf

### Developments in South:
Review and enable all Costa Blanca South developments in `/data/property-development-mapping.ts`

---

## Phase 3: Costa Blanca North

### Key Areas:
| Area | Priority | Notes |
|------|----------|-------|
| Jávea / Xàbia | High | Premium market, international buyers |
| Moraira | High | Luxury focused |
| Calpe | High | Mix of budgets |
| Benidorm | Medium | High volume, apartments |
| Altea | Medium | Artistic community |
| Denia | Medium | Northern gateway |

### Golf Courses:
- Puig Campana Golf (Finestrat)
- La Sella Golf (Denia area)

---

## Phase 4: Costa Calida (Murcia)

### Areas:
- Mar Menor
- Los Alcázares
- San Pedro del Pinatar
- Mazarrón

### Golf Courses:
- Hacienda del Álamo
- Roda Golf
- Serena Golf
- Aguilon Golf

---

## Technical Deployment Details

### Property Feed Strategy

The feeds are configured in `/src/lib/feed-config.ts`. Currently:

1. **REDSP Feed** (Primary): ~80% Costa Blanca South
2. **Background Properties**: More Costa Blanca North focus
3. **Miralbo Urbana**: Luxury villas, North focus

**For Phase 1 (Torrevieja)**:
- The REDSP feed already contains many Torrevieja properties
- These should load automatically when the area page is accessed
- Filter by town/area in property listings

### Incremental Deployment Options

**Option A: Full Deploy, Filter Frontend**
- Deploy entire site
- Use area filters to focus marketing
- All properties available but emphasis on Phase 1 area

**Option B: Selective Property Display**
- Modify property service to filter by area/phase
- Only show "approved" areas
- More controlled but requires code changes

**Recommendation**: Option A is simpler. Deploy full site but focus marketing/SEO on Phase 1 area first.

---

## Quality Assurance Checklist

### Per-Area Checks:
- [ ] Area page loads without errors
- [ ] Area image displays correctly
- [ ] Property count is accurate
- [ ] At least 10 properties showing
- [ ] Price range filter works
- [ ] Property type filter works
- [ ] Individual property pages load
- [ ] Contact/inquiry forms work
- [ ] WhatsApp link correct
- [ ] Mobile responsive layout

### Site-Wide Checks:
- [ ] Homepage hero image
- [ ] Navigation works on mobile
- [ ] Footer links correct
- [ ] Privacy policy page accessible
- [ ] Cookie consent banner appears
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt allows indexing

---

## Rollback Plan

If issues are found after deployment:

1. **Quick Fix**: Netlify allows instant rollback to previous deploy
2. **How**: Netlify Dashboard → Deploys → Select previous deploy → "Publish deploy"
3. **Recovery Time**: < 1 minute

---

## Post-Deployment Monitoring

### Week 1:
- Monitor Google Search Console for crawl errors
- Check Airtable for form submissions
- Review Google Analytics for traffic patterns
- Test all contact methods daily

### Week 2-4:
- Monitor page rankings in target areas
- Check property feed sync (data freshness)
- Review user feedback
- Plan Phase 2 based on learnings

---

## Timeline Suggestion

| Week | Activity |
|------|----------|
| Week 1 | Deploy Phase 1 (Torrevieja), intensive testing |
| Week 2 | Fix any issues, start Phase 2 prep |
| Week 3 | Deploy Phase 2 (Costa Blanca South) |
| Week 4 | Costa Blanca South QA + Phase 3 prep |
| Week 5 | Deploy Phase 3 (Costa Blanca North) |
| Week 6 | Deploy Phase 4 (Costa Calida) |

---

## Commands Reference

```bash
# Local development
npm run dev

# Build for production (test locally)
npm run build

# Start production build locally
npm run start

# Generate AI content
npm run generate-content

# Type check
npx tsc --noEmit

# Deploy to Netlify (if CLI installed)
netlify deploy --prod
```

---

## Questions to Resolve

1. **Analytics**: Is GTM already set up? What's the GTM ID?
2. **Forms**: Is Airtable connected and tested?
3. **Domain**: Are DNS settings finalized?
4. **SSL**: Is HTTPS working correctly?
5. **Redirects**: Any old URLs that need redirecting?

---

## Next Steps (Immediate)

1. Review this strategy and confirm Phase 1 scope
2. Set up Netlify environment variables
3. Run local build and test Torrevieja pages
4. Deploy to staging/preview first
5. Final QA on preview URL
6. Go live with Phase 1

Let me know if you'd like me to help with any of these steps!
