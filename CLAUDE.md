# CLAUDE.md - Strict Rules for AI Assistant

## CRITICAL: READ THIS BEFORE EVERY ACTION

### Rule 1: NEVER PUSH WHILE GITHUB ACTIONS ARE RUNNING
- **BEFORE suggesting `git push`**, ALWAYS ask: "Is there a GitHub Action running?"
- If user says yes or you're unsure: **DO NOT PUSH**
- Content generation runs can take 1-6+ hours
- Each failed run wastes real money in API credits
- **If you break this rule, you waste the user's money**

### Rule 2: NEVER SAY "IT'S FINE" WITHOUT VERIFICATION
- Don't assume things are fine
- Don't say "keep pushing" without thinking through consequences
- If you're not 100% certain, say "I'm not sure, let me check"
- Always trace through what will actually happen

### Rule 3: UNDERSTAND THIS PROJECT
**AI CONTENT = THE PRODUCT**
**FEEDS = JUST INPUT DATA**

This is NOT a feed aggregator. The feeds provide raw property data. The VALUE is:
- AI-generated descriptions
- AI-generated meta titles
- AI-generated image alt tags
- AI-generated FAQs
- Rich, unique SEO content for every property

### Rule 4: TEST BEFORE SUGGESTING DEPLOYMENT
Before telling user to push/deploy:
1. Check git status
2. Check for running GitHub Actions
3. Verify the actual error is fixed, not just patched
4. Think through ALL consequences of the change

### Rule 5: MONEY IS INVOLVED
- Anthropic API calls cost money
- GitHub Actions running = API credits burning
- Failed builds that ran for hours = wasted money
- **Treat every push as if it costs $10**

### Rule 6: WHEN USER ASKS "SHOULD WE WAIT?"
**THE ANSWER IS PROBABLY YES**
- If there's any doubt, wait
- Ask what's currently running
- Don't rush

### Rule 7: ADMIT UNCERTAINTY
- "I think" is better than false confidence
- "Let me verify" is better than assuming
- "I'm not sure about the side effects" is honest

### Rule 8: LONG-RUNNING PROCESSES
When a process takes more than a few minutes:
- Warn user not to push anything
- Set expectation about duration
- Explain what will happen if interrupted

---

## Project Structure

### Feeds (INPUT - not the product)
- REDSP Feed: Main property data
- Background Properties Feed: Additional properties
- Miralbo Feed: Luxury properties

### Content Generation (THE ACTUAL PRODUCT)
- `src/scripts/generate-all-content.ts` - Main content generator
- Uses Claude Haiku API to generate rich content
- Outputs to `src/content/` folder
- Can filter by town: `--town=torrevieja`

### Key Files
- `.github/workflows/generate-content.yml` - Content generation Action
- `src/lib/xml-parser.ts` - Feed parsing
- `src/app/builders/[slug]/page.tsx` - Builder pages
- `src/content/builders/*.json` - AI-generated builder content
- `src/content/developments/*.json` - AI-generated development content

### Build Process
1. Netlify runs `npm run build`
2. Next.js fetches XML feeds
3. Static pages generated for all properties
4. AI content from JSON files is used where available

---

## Checklist Before Any Push

- [ ] Is there a GitHub Action currently running?
- [ ] If yes, STOP - do not push
- [ ] Have I actually verified the fix works?
- [ ] Have I considered side effects?
- [ ] Am I certain, or am I guessing?

---

## Cost Tracking
- Each content generation run: ~$5-20 in API credits depending on scope
- Full run (all properties): 4-6+ hours, $20-40
- Single town (e.g., torrevieja): 1-2 hours, $5-10

**Every failed run due to push conflicts = money burned**
