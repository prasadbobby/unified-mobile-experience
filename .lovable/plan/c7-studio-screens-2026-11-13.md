# C7 studio screens

## What will be added
- Ten new screen concepts, each with its own page: Guest home, Package detail, Renew, Invoices, Attendance, BMI, Medical reports, Progress photos, Workout videos, and Announcements.
- A separate Invoice detail page, making **11 new pages** in total, all linked from the existing New screens list.
- Phone-only layouts capped at 390px, composed for a 390×844 viewport, with scrolling where needed.
- Preserve the current Lexend/dark/lime design system, top glow, round back controls, sheets, and bottom navigation. New buttons will not glow.
- Distinct ticket, ledger, receipt, calendar, gauge, document shelf, photo comparison, video library, and announcement-feed treatments.
- New studio and progress-photo imagery saved alongside existing assets.

## Working interactions
- Browse packages and open a phone-request sheet with validation and confirmation.
- Switch attendance months, calculate BMI, filter photos and drag the comparison slider.
- Upload reports into the current review session; open report previews.
- Open workout playback and download actual media, with progress and completion states.
- Open invoice detail and download/share a generated PDF receipt.
- Filter announcements and mark items read.

## Assumptions
This request is a frontend review experience, not a real membership integration. Names, packages, payments, attendance, reports, and announcements will be clearly supplied as realistic illustrative studio data, not asserted as actual C7 records. Phone requests and uploaded reports stay in the current session; no coach messages or real account changes are sent.

## Technical details
- Reuse the app shell and existing C7 primitives; add a focused shared studio kit and sample-data module.
- Keep all visual tokens in the existing global stylesheet, scoped so older screens remain unchanged.
- Each page has unique C7 metadata and typed navigation.
- Add focused tests for BMI and invoice calculations; verify page loading and key interactions at phone width.