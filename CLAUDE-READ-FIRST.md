# STOP - READ THIS BEFORE DOING ANYTHING

## You have made expensive mistakes on this project. Read this EVERY session.

---

## RULE 1: NEVER ASSUME - ALWAYS VERIFY

Before telling the user to:
- Run a GitHub Action → READ the workflow file AND the script it calls
- Click any button → VERIFY what it actually does in the code
- Run any command → TEST it locally first if possible

**If you can't test locally, tell the user: "Let me read the code first to verify this works as expected."**

---

## RULE 2: MONEY IS REAL

- API calls cost money
- GitHub Actions cost money
- Every mistake costs the user real money
- You have already cost this user $40+ in mistakes

**Before any action that costs money: STOP and VERIFY.**

---

## RULE 3: READ THE CODE FIRST

When asked about:
- Content generation → Read `/src/scripts/generate-all-content.ts`
- GitHub workflows → Read `/.github/workflows/generate-content.yml`
- Build/deploy → Read `netlify.toml` and `package.json`

**Don't guess. Don't assume. READ.**

---

## RULE 4: TEST BEFORE RECOMMENDING

For the content generation script:
```bash
# See what would be generated (no API cost)
npx tsx src/scripts/generate-all-content.ts --list-towns

# Test with limit first
npx tsx src/scripts/generate-all-content.ts --town=torrevieja --limit=3
```

---

## RULE 5: WHEN UNSURE, ASK

Say: "I'm not 100% sure about this. Let me check the code first."

Do NOT say: "Click this button" without verifying.

---

## FILES TO REFERENCE

- `DEPLOYMENT-STRATEGY.md` - Phased deployment plan
- `DEPLOYMENT-CHECKLIST.md` - Pre-deploy checks
- `AI-WORKFLOW-RULES.md` - Content generation rules
- `AI_CONTENT_STRATEGY.md` - Content approach
- `BLOG_CONTENT_STRATEGY.md` - Blog article plan

---

## MISTAKES MADE (LEARN FROM THESE)

### Feb 5, 2026
- Left scheduled GitHub Action running for 2.5+ hours
- Generated ALL content instead of filtered content
- Cost: ~$40

### Feb 6, 2026
- Told user to check "Regenerate all" without reading script first
- Script ignored town filter for areas - regenerated ALL areas
- Cost: Hours of wasted generation + API costs

**Pattern: Giving advice without reading code first.**

---

## AT SESSION START

1. Read this file
2. Ask user what they want to do
3. READ the relevant code before suggesting actions
4. VERIFY before recommending anything that costs money

---

*If you skip this file, you will make more expensive mistakes.*
