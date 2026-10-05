/**
 * Hypurr gateway as the default provider (OpenAI-compatible).
 * Upstream OpenCode Zen / console OAuth is disabled in this fork.
 * BYOK providers (Anthropic, OpenAI, Google, OpenRouter, …) remain available via their own plugins.
 */
import { Effect } from "effect"
import type { Scope } from "effect"
import { define } from "@opencode-ai/plugin/v2/effect/plugin"
import { Integration } from "../../integration"
import { ProviderV2 } from "../../provider"

/** Default Hypurr gateway base (no trailing slash). Override with HYPURR_GATEWAY_URL. */
export function gatewayBase(): string {
  return (
    process.env.HYPURR_GATEWAY_URL?.replace(/\/$/, "") ||
    process.env.OPENCODE_API_URL?.replace(/\/$/, "") ||
    "https://api.hypurr.dev/v1"
  )
}

export const OpencodePlugin = define<Scope.Scope>({
  id: "hypurr-gateway",
  effect: Effect.fn(function* (ctx) {
    const base = gatewayBase()
    const apiKey =
      process.env.HYPURR_API_KEY ||
      process.env.HYPURR_GATEWAY_KEY ||
      process.env.OPENCODE_API_KEY ||
      "trial"

    yield* ctx.integration.transform((draft) => {
      draft.update("hypurr", (integration) => {
        integration.name = "Hypurr"
      })
      draft.method.update({
        integrationID: "hypurr",
        method: { type: "key", label: "Hypurr API key" },
      })
    })

    yield* ctx.catalog.transform((catalog) => {
      // Disable legacy Zen / opencode.ai provider if present in models.dev catalog.
      const zen = catalog.provider.get(ProviderV2.ID.opencode)
      if (zen) {
        catalog.provider.update(zen.provider.id, (provider) => {
          provider.name = "OpenCode Zen (disabled)"
          provider.enabled = false
        })
        for (const model of zen.models.values()) {
          catalog.model.update(zen.provider.id, model.id, (draft) => {
            draft.enabled = false
          })
        }
      }

      // Register / refresh Hypurr gateway as OpenAI-compatible.
      catalog.provider.update(ProviderV2.ID.make("hypurr"), (provider) => {
        provider.name = "Hypurr"
        provider.enabled = true
        provider.api = {
          type: "aisdk",
          package: "@ai-sdk/openai-compatible",
          url: base,
        }
        provider.request.body.apiKey = apiKey
        Object.assign(provider.request.headers, {
          "HTTP-Referer": "https://hypurr.dev/",
          "X-Title": "hypurr-agent",
        })
      })

      // Free-tier model shown by default (gateway maps this to a cheap upstream).
      catalog.model.update(ProviderV2.ID.make("hypurr"), "hypurr-free", (model) => {
        model.name = "Hypurr Free"
        model.enabled = true
        model.status = "active"
        model.api.id = "hypurr-free"
        model.cost = [{ input: 0, output: 0, cache: { read: 0, write: 0 } }]
        model.capabilities.tools = true
        model.limit = { context: 128_000, output: 8192 }
      })
    })
  }),
})
