import { NextResponse } from 'next/server';
import { getAccessToken } from '@/services/auth.service';
import axiosInstance from '@/services/api.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const clientId = process.env.TWITCH_CLIENT_ID!;

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const token = await getAccessToken();
    const fields =
      type === 'suggestions'
        ? 'fields name,cover.url; limit 5;'
        : 'fields name,cover.url,first_release_date;';

    const response = await axiosInstance.post(
      '/games',
      `search "${query}"; ${fields}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-ID': clientId,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch games',
      },
      { status: 500 }
    );
  }
}
