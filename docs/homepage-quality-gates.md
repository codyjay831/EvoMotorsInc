# Homepage quality gates

Run before merging each homepage PR and before production release.

## Automated

```bash
npm run lint
npm run build
npm run check:homepage
```

## Manual smoke (5 min)

### Desktop (1440px)
- [ ] Hero ≤ one viewport; h1 visible without scroll
- [ ] Featured inventory within one scroll of hero
- [ ] Card click opens `/inventory/[id]`
- [ ] Browse Inventory only in hero + header (not CTA band)
- [ ] Skip link focuses `#main-content`

### Mobile (375px)
- [ ] Hero CTA reachable with thumb
- [ ] Vehicle images ≥ 200px tall
- [ ] No horizontal scroll

### Accessibility
- [ ] Tab through header → skip link → hero CTAs → inventory cards
- [ ] Rebates modal: Escape closes; Tab cycles inside dialog
- [ ] `prefers-reduced-motion`: no required motion for content

### SEO / assets
- [ ] View page source: one `<h1>` on homepage
- [ ] OG image URL resolves (share debugger or curl)
- [ ] `/inventory/[id]/reserve` has `noindex`
- [ ] Rich Results Test: AutoDealer + sample VDP Car schema

## Performance budgets (mobile, throttled)

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |

Use Lighthouse mobile or PageSpeed Insights on `/` after deploy.
