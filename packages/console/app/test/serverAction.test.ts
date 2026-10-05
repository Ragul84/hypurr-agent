import { describe, expect, test } from "bun:test"
import { sanitizeServerActionRequest } from "../src/lib/server-action"

describe("server action referer", () => {
  test("preserves same-origin return locations", () => {
    const request = new Request("https://dev.hypurr.dev/_server?id=action", {
      headers: { referer: "https://dev.hypurr.dev/auth?next=%2Fconsole" },
    })

    expect(sanitizeServerActionRequest(request)).toBe(request)
  })

  test("replaces unsafe return locations with the request origin", () => {
    const referers = ["https://evil.example/phishing-login", "not a url", undefined]

    expect(
      referers.map((referer) =>
        sanitizeServerActionRequest(
          new Request("https://dev.hypurr.dev/_server?id=action", {
            headers: referer === undefined ? undefined : { referer },
          }),
        ).headers.get("referer"),
      ),
    ).toEqual(["https://dev.hypurr.dev", "https://dev.hypurr.dev", "https://dev.hypurr.dev"])
  })

  test("does not change other routes", () => {
    const request = new Request("https://dev.hypurr.dev/auth", {
      headers: { referer: "https://evil.example/phishing-login" },
    })

    expect(sanitizeServerActionRequest(request)).toBe(request)
  })
})
