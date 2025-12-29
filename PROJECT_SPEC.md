# New Build Homes Costa Blanca - Project Specification

**READ THIS FILE AT THE START OF EVERY SESSION**

## The Mission
XML feed → AI-generated articles → Auto-deploy → SEO traffic → Leads

This is a lead generation website. Not a property portal. Visitors must contact us for pricing/availability.

## Architecture

### Data Flow
1. XML feeds (Miralbo active, REDSP disabled) provide property data
2. Site fetches feed at build time with ISR (1-hour revalidation)
3. AI pipeline generates SEO articles for developments, builders, areas
4. Articles stored in /content/ directory
5. Site displays feed data + AI content together

### Page Types
- Development: /developments/[slug] - Property listings + AI article
- Builder: /builders/[slug] - Their developments + AI bio
- Area: /areas/[slug] - Properties in area + AI guide

### Key Principles
- NO hardcoded sample data
- ALL data from XML feeds
- AI generates ALL long-form content
- 1-hour ISR for auto-updates
- Mobile-first, fast loading

## Feeds

### Miralbo (ACTIVE)
- URL: https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c
- Properties: ~30
- Location: Javea area
- Status: Working

### REDSP (DISABLED)
- Properties: 977
- Status: Loading issues, contact provider

## CTAs (use everywhere)
- WhatsApp: https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0
- Phone: +34 634 044 970
- Habeno: https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e

## Stack
- Next.js 14, Tailwind CSS, TypeScript
- Netlify: cosmic-lollipop-bafe04
- GitHub: oskar-del/newbuild-homes-costa-blanca
- Live: newbuildhomescostablanca.com

## Owner
Oskar - oskar@hanssonhertzell.com
