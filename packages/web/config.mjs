const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://hypurr.dev" : `https://${stage}.opencode.ai`,
  console: stage === "production" ? "https://hypurr.dev/auth" : `https://${stage}.opencode.ai/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/Ragul84/hypurr-agent",
  discord: "https://hypurr.dev/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
