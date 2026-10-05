# Hypurr Agent

Hypurr's own coding agent — a fork of [OpenCode](https://github.com/anomalyco/opencode) (MIT),
rebranded and configured to use the Hypurr gateway by default, with bring-your-own-key providers
(Anthropic, OpenAI, Google, OpenRouter, …) available.

Binary: `hypurr-agent`  
Config / data: `~/.hypurr/agent/`

```bash
hypurr-agent --version
hypurr-agent acp          # Agent Client Protocol (used by Hypurr host)
hypurr-agent run "…"      # one-shot
```

See NOTICE for attribution. Upstream publish channels (npm, Homebrew, AUR) are disabled in this fork.
