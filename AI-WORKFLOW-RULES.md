# AI Workflow Rules - MUST FOLLOW

## BEFORE Telling User to Run ANY GitHub Action:

1. **READ THE SCRIPT FIRST** - Read the actual code that will run
2. **VERIFY THE LOGIC** - Check that filters, flags, and options do what you think
3. **TEST LOCALLY** - Run with `--list-towns` or dry-run mode if available
4. **EXPLAIN EXACTLY** what will happen and how much it might cost

## NEVER:
- Assume how a script works without reading it
- Tell user to click buttons without verifying the outcome
- Give advice about workflows without checking the code first

## Cost Awareness:
- Every API call costs money
- Running for ALL areas = expensive
- Always prefer filtered/limited runs first
- Use `--limit=5` for testing

## Commands to Test Before GitHub:

```bash
# See what WOULD be generated (no API calls)
npx tsx src/scripts/generate-all-content.ts --list-towns

# Test with limit (only 5 items)
npx tsx src/scripts/generate-all-content.ts --town=torrevieja --limit=5

# Full local run (still costs API but catches code errors)
npx tsx src/scripts/generate-all-content.ts --town=torrevieja
```

## If Unsure:
ASK - Don't guess. Say "let me check the code first" instead of assuming.

---

*Created after costly mistakes on Feb 5-6, 2026. Follow these rules.*
