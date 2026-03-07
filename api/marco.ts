import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: "no_api_key", message: "ANTHROPIC_API_KEY not set" });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(text);
  } catch (err: any) {
    res.status(502).json({ error: "upstream_error", message: err.message });
  }
}
