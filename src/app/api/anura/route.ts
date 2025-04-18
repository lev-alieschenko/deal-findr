import { NextRequest } from 'next/server';

export const runtime = 'edge';

const ANURA_BROWSER_API = 'https://api.anura.io/v1/script/browsers';
const ANURA_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiIwMzM4MjU1OTkxODUiLCJpYXQiOjE3NDQwNTcyNDQuMTU2MDI1LCJuYmYiOjE3NDQwNTcyNDQuMTU2MDI1LCJqdGkiOiJlR0ZodHhyUmFsYlAzSTBTamxBamNXYzcyd01JR0luWCIsImF1ZCI6InRSckl4anV5YXk3M2lnWDZYTWJxNlElM0QlM0QiLCJ0a24iOiJhcGkiLCJhY3QiOjU1MiwidXNyIjoxNDg0LCJpbnMiOiJbMjY4NTY5NDMwMV0ifQ.q2GtflP_ldLGgUzTDnYukInhKmeWPJ7kI1u4cqwuVO2k4Y85fmwziV-wp-KKQV5T-x-GvLjBZe5ix8gwbUyiqA';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return Response.json({ error: 'Missing start or end date' }, { status: 400 });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('token', ANURA_TOKEN);
    formData.append('start', start);
    formData.append('end', end);

    const response = await fetch(ANURA_BROWSER_API, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch from Anura' }, { status: response.status });
    }

    const result = await response.json();
    return Response.json(result);
  } catch (err: any) {
    console.error('Anura GET error:', err);
    return Response.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
