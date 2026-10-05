# Rebrand notes

Hypurr Agent is based on OpenCode (MIT). See **LICENSE** and **NOTICE**.

## User-facing branding (this fork)

| Item | Value |
|------|--------|
| Binary | `hypurr-agent` |
| Config / data | `~/.hypurr/agent` |
| mDNS default | `hypurr-agent.local` |
| GitHub workflow template | `.github/workflows/hypurr-agent.yml` |
| Slash command (GH comments) | `/hypurr-agent` |

## Intentionally unchanged (unavoidable / non-product UI)

- **npm workspace scope** `@opencode-ai/*` — renaming breaks the monorepo; not shown in the shipped CLI wordmark.
- **Env aliases** `OPENCODE_*` — still accepted for compatibility alongside `HYPURR_*` / `HYPURR_AGENT_*`.
- **GitHub App identity** `opencode-agent[bot]`, `https://github.com/apps/opencode-agent`, OIDC audience `opencode-github-action` — upstream App until Hypurr publishes its own.
- **models.dev provider ids** `opencode` / `opencode-go` — catalog keys; Zen provider is disabled; UI may still list the id for BYOK/catalog.
- **Discovery** `/.well-known/opencode` — upstream well-known path when probing remote providers.
- **Social card CDN** `social-cards.sst.dev/opencode-share/...` — third-party asset URL path.
- **Effect service tags** `@opencode/Run*` — internal Effect identifiers.
- **Basic-auth env names** `OPENCODE_SERVER_USERNAME` / `OPENCODE_SERVER_PASSWORD` — env key names kept; default username is `hypurr-agent`.
