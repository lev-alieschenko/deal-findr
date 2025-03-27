import { NextRequest, NextResponse } from "next/server";

const specialReferrers = ["yarb.net"];
const destination = "https://redirect-destination.com";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const referrer = request.headers.get("referer") || "";

  if (referrer && specialReferrers.some((domain) => referrer.includes(domain))) {
    const redirectUrl = new URL(destination);
    redirectUrl.searchParams.set("source", "redirect");

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectUrl.toString()}" />
        <title>Redirecting...</title>
        <script>window.location.href = "${redirectUrl.toString()}";</script>
      </head>
      <body>
        <p>If you are not redirected automatically, click <a href="${redirectUrl.toString()}">here</a>.</p>
      </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      }
    );
  }

  return new NextResponse("This is the usual page content.", {
    headers: { "Content-Type": "text/plain" },
  });
}
