export async function GET() {
  const body = `# Sciatica Spot

> Research-informed sciatica, seated-posture, and recovery guides without retailer affiliate links.

## Editorial signals
- Site: https://sciaticaspot.com
- About: https://sciaticaspot.com/about
- Affiliate Disclosure: https://sciaticaspot.com/affiliate-disclosure
- Editorial Guidelines: https://sciaticaspot.com/editorial-guidelines
- Privacy Policy: https://sciaticaspot.com/privacy
- Contact: https://sciaticaspot.com/contact

## Contact
- hello@sciaticaspot.com
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
