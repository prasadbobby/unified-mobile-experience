<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- App is a mobile-first (max 430px) fitness app; shared shell/nav lives in src/components/app/ui.tsx so every screen looks the same.
- All images live in src/assets/; demo content lives in src/lib/data.ts and user state (name, follows, likes, saves) in src/lib/store.ts via localStorage, since there is no backend yet.
- Custom rounded icons live in src/components/app/icons.tsx; generic UI icons come from lucide-react.
- C7 member screens share building blocks in src/components/c7/ (kit.tsx, moods.tsx) and sample data in src/lib/c7-data.ts; keep them presentational so layouts port to React Native.
- First-login onboarding lives under src/routes/first-login/* with shared pieces in src/components/onboard/ and answers in src/lib/onboarding.ts (in-memory); standalone SVG artwork in src/assets/*.svg uses inline fills only so it can be copied.
