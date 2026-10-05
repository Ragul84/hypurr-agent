const modelsUrl = process.env.OPENCODE_MODELS_URL || "https://api.hypurr.dev/v1/models-meta"

export const modelsData = process.env.MODELS_DEV_API_JSON
  ? await Bun.file(process.env.MODELS_DEV_API_JSON).text()
  : await fetch(`${modelsUrl}/api.json`).then((response) => response.text())

console.log("Loaded models.dev snapshot")
