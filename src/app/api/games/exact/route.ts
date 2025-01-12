import { NextResponse } from 'next/server';
import { getAccessToken } from '@/services/auth.service';
import { fetchGameDetails } from '@/services/api.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const clientId = process.env.TWITCH_CLIENT_ID!;

  if (!id) {
    return NextResponse.json(
      { error: 'Game name is required' },
      { status: 400 }
    );
  }

  try {
    const token = await getAccessToken();
    const games = await fetchGameDetails(parseInt(id), token, clientId);
    return NextResponse.json(games);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch game',
      },
      { status: 500 }
    );
  }
}
