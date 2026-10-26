# Make Address Mandatory Across All Landing Pages

## Goal
Apply the same address requirement from the main Chimney Sweep page to the booking forms on the other three landing pages, without changing anything else.

## Pages to update
- `src/routes/chimney-repair.tsx`
- `src/routes/gas-fireplace-repair.tsx`
- `src/routes/chimney-inspection.tsx`

## Changes
In each page's `BookingForm` step 2:
- Change the `Field` label from `"Street Address (optional)"` to `"Street Address"`.
- Add `required` to the `name="street"` input.
- Keep existing placeholders, styling, and field names unchanged.

## Verification
- Run a typecheck (`bunx tsgo --noEmit`).
- Use Playwright to submit a 3-step form on at least one updated page and confirm:
  - Submission is blocked when street address is empty.
  - Submission succeeds and redirects to `/thank-you` when street address is filled.
  - GTM script and `dataLayer` remain present.
