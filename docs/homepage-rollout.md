# Homepage v2 rollout

## Feature flag

```env
# Default: v2 enabled. Set false to rollback to minimal fallback layout.
NEXT_PUBLIC_HOME_V2=true
```

Rollback: set `NEXT_PUBLIC_HOME_V2=false` and redeploy. Fallback shows hero + featured inventory only.

## KPI baseline (capture before launch)

Record in GA4 / GSC for the 7 days before deploy:

| Metric | Baseline | Post-launch (7d) |
|--------|----------|------------------|
| Homepage → `/inventory` CTR | | |
| Homepage → VDP CTR | | |
| VDP → lead action (contact / reserve / request) | | |
| Organic sessions: `/`, `/inventory`, `/inventory/[id]` | | |

## Launch checklist

- [ ] `NEXT_PUBLIC_BUSINESS_PHONE` and hours set in production env
- [ ] `NEXT_PUBLIC_GBP_URL` and `NEXT_PUBLIC_GOOGLE_MAPS_URL` set
- [ ] GSC property verified (`NEXT_PUBLIC_GSC_VERIFICATION`)
- [ ] GA4 live (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] NAP on site matches Google Business Profile exactly
- [ ] Submit sitemap in GSC after deploy

## Rollback triggers

Rollback if within 7 days of launch:

- Homepage bounce rate increases > 15% vs baseline
- Inventory CTR drops > 20% vs baseline
- Critical bug (broken VDP links, inventory load failure)

Rollback steps:
1. Set `NEXT_PUBLIC_HOME_V2=false`
2. Redeploy
3. Investigate in staging before re-enabling
