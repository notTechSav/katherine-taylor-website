# Project Workflow - Builder.io as Source of Truth

## ⚠️ CRITICAL: Read This First

**Builder.io is the source of truth for this project.**

All code and content changes should be made through Builder.io's visual editor. The CLI (Claude) should **only** be used for:
- Debugging issues
- Reading/analyzing code
- Answering questions about the codebase
- Emergency fixes when Builder.io is down

**DO NOT** make code commits through CLI unless absolutely necessary.

---

## Why This Matters

**The Problem:**
- Builder.io has its own AI agent that makes commits when you edit visually
- CLI (Claude) makes separate commits on feature branches
- These create parallel histories that conflict
- When Builder.io syncs, it sees "old" code from its own branch → looks like a revert

**The Solution:**
- Let Builder.io make all commits to `main`
- CLI operates in read-only mode for analysis
- Only use CLI commits for emergency fixes (then immediately pull in Builder.io)

---

## Current State

**Repository:** https://github.com/notTechSav/Cartier-20Inspired-20Homepage
**Branch:** `main` (Builder.io syncs from here)
**Vercel Project:** cartier-20-inspired-20-homepage
**Live URL:** https://cartier-20-inspired-20-homepage.vercel.app

**Latest Commits (as of Oct 11, 2024):**
- `5e9b1fb` - Phase 2 cleanup (15.6MB removed)
- `99ddd35` - Phase 1 cleanup (config fixes for Builder.io sync)
- `eed3134` - Critical project documentation

---

## Workflow: Making Changes

### For Content/Design Changes (90% of the time):

1. **Go to Builder.io Dashboard**
2. **Edit pages visually** in the editor
3. **Click Publish** when done
4. Builder.io auto-commits to GitHub `main`
5. Vercel auto-deploys the changes
6. Done! ✅

### For Code Changes (component fixes, new features):

1. **Make changes in Builder.io's code editor** (if possible)
2. **Or:** Edit locally, commit to `main`, push immediately:
   ```bash
   git checkout main
   git pull origin main
   # Make your changes
   git add -A
   git commit -m "brief description"
   git push origin main
   ```
3. Wait 1-2 minutes for Builder.io to sync
4. Verify in Builder.io Dashboard that it sees your changes

### For Debugging (Claude CLI):

**What Claude CAN do:**
- ✅ Read files and analyze code
- ✅ Explain how things work
- ✅ Search for bugs or issues
- ✅ Suggest fixes (you implement in Builder.io)
- ✅ Test builds locally
- ✅ Check Vercel deployments

**What Claude SHOULD NOT do:**
- ❌ Make commits (creates parallel branches)
- ❌ Push to GitHub (conflicts with Builder.io)
- ❌ Edit components (unless emergency)

**Exception - Emergency Fixes:**
If Builder.io is down or broken:
1. Claude can make emergency commits to `main`
2. **Immediately after:** Go to Builder.io → click "Sync" to pull the changes
3. Verify Builder.io sees the update before making more edits

---

## If Things Get Out of Sync Again

**Symptoms:**
- Builder.io shows old code
- Changes you made disappeared
- "Revert" appeared in commit history

**Fix:**
1. Check which branch Builder.io is syncing from (should be `main`)
2. Check latest commit on GitHub `main`
3. If Builder.io is on wrong branch:
   ```bash
   # Force your work to main
   git checkout your-working-branch
   git push origin your-working-branch:main --force
   ```
4. Wait 1-2 minutes
5. Builder.io → Settings → Integrations → GitHub → "Sync Components"

---

## Branch Strategy

**Active Branch:**
- `main` - Builder.io syncs from here, Vercel deploys from here

**Archive Branches (don't use):**
- `ai_main_45c6cae39678` - Old CLI work (merged to main)
- `ai_main_e18558670184` - Old CLI work
- `ai_main_f87d0e549c38` - Old CLI work

**Rule:** Only work on `main`. No feature branches unless coordinating with Builder.io.

---

## Builder.io Configuration

**Space ID:** `5b9cc53f5f324d22a1f8c88faaaa270c`
**API Key:** `bpk-5836f445627648e5843ef7b6ceb65996` (in `.env`, don't commit)

**GitHub Integration:**
- Repository: `notTechSav/Cartier-20Inspired-20Homepage`
- Branch: `main` ⬅️ CRITICAL
- Auto-sync: Enabled

**Component Registry:**
All components registered in `client/builder-registry.tsx`

---

## Vercel Configuration

**Project:** `cartier-20-inspired-20-homepage`
**Production Branch:** `main`
**Build Command:** `pnpm build`
**Output Directory:** `dist/spa`

**Environment Variables:**
- `VITE_BUILDER_API_KEY` = `bpk-5836f445627648e5843ef7b6ceb65996`

**Deployment Trigger:**
Every push to `main` auto-deploys to production.

---

## Quick Reference

| Task | Tool | Command/Action |
|------|------|----------------|
| Edit content | Builder.io | Visual editor → Publish |
| Add new component | Builder.io | Code editor or upload |
| Fix bug | Builder.io | Code editor → Publish |
| Debug issue | Claude CLI | Read files, analyze |
| Check deployment | Claude CLI | `vercel ls --prod` |
| Test build | Claude CLI | `pnpm build` |
| Emergency fix | Claude CLI | Edit → commit to `main` → push |

---

## Files You Should Know

**Don't Edit (managed by Builder.io):**
- `client/builder-registry.tsx` (component registrations)
- `client/pages/BuilderPage.tsx` (Builder.io renderer)

**Can Edit Locally:**
- `client/components/site/*` (your components)
- `client/components/ui/*` (UI primitives)
- `client/pages/*` (route pages)
- `tailwind.config.ts` (design tokens)

**Configuration:**
- `vercel.json` (Vercel settings)
- `vite.config.ts` (Vite build)
- `package.json` (dependencies)
- `.env` (secrets - don't commit!)

---

## Emergency Contact

If everything breaks:
1. Check Vercel deployment logs
2. Check Builder.io sync status
3. Check GitHub Actions (if any)
4. Ask Claude to debug (read-only)

**Last Resort:**
Force-push a known good commit to `main`:
```bash
git checkout main
git reset --hard <good-commit-hash>
git push origin main --force
```

Then wait for Builder.io and Vercel to sync.

---

**Last Updated:** October 11, 2024
**By:** Claude (CLI setup for Builder.io workflow)
