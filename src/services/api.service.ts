import axios from 'axios';
import { IGDBGame } from '@/models';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IGDB_API_URL,
  timeout: 10000,
});

export default apiInstance;

export const fetchGameDetails = async (
  id: number,
  token: string,
  clientId: string
) => {
  const response = await apiInstance.post(
    '/games',
    `where id = ${id}; 
    fields name,
      cover.url,
      first_release_date,
      rating,
      platforms.name,
      screenshots.url,
      similar_games.name,
      similar_games.cover.url,
      genres.name,
      involved_companies.company.name,
      summary;
    `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': clientId,
      },
    }
  );

  const games: IGDBGame[] = response.data;
  return games.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover || { id: 0, url: '' },
    first_release_date: game.first_release_date || 0,
    genres: game.genres || [],
    platforms: game.platforms || [],
    rating: game.rating || 0,
    screenshots: game.screenshots || [],
    similar_games: game.similar_games || [],
    summary: game.summary || '',
    involved_companies: game.involved_companies || [],
    yearsAgo: game.first_release_date
      ? Math.floor(
          (Date.now() / 1000 - game.first_release_date) / (60 * 60 * 24 * 365)
        )
      : null,
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toISOString()
      : null,
  }));
};
