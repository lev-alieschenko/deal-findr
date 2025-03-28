import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

//specialReferrers
const specialReferrers = ["yarb"];
const destination = "https://redirect-destination.com";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const referrer = searchParams.get("referrer") || request.headers.get("referer") || "";
  console.log(referrer, "========referer======")
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

  return new NextResponse(`This is the usual page content. Referrer: ${referrer}`, {
    headers: { "Content-Type": "text/plain" },
  });
}
