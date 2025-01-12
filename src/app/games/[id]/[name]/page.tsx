import React from 'react';
import { Metadata } from 'next';
import CustomImage from '@/components/custom-image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchGameDetails } from '@/services/api.service';
import { getAccessToken } from '@/services/auth.service';
import { ImageGallery } from '@/components/image-gallery';

type Props = {
  params: Promise<{ id: string; name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const token = await getAccessToken();
  const clientId = process.env.TWITCH_CLIENT_ID!;
  const [gameData] = await fetchGameDetails(Number(id), token, clientId);

  return {
    title: gameData.name,
    openGraph: {
      images: gameData.cover ? [gameData.cover.url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const token = await getAccessToken();
  const clientId = process.env.TWITCH_CLIENT_ID!;
  const [gameData] = await fetchGameDetails(Number(id), token, clientId);

  const formattedReleaseDate = gameData.releaseDate
    ? new Date(gameData.releaseDate).toLocaleDateString()
    : 'No date available';

  return (
    <div className="flex flex-col w-full max-w-md mx-auto min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex gap-3">
          <CustomImage
            src={gameData.cover.url}
            alt={gameData.name}
            size="cover_big"
            className="rounded-xl"
          />
          <div>
            <h1 className="text-xl font-semibold">{gameData.name}</h1>
            <p className="text-sm text-muted-foreground">
              {gameData.involved_companies
                .map((company) => company.company.name)
                .join(', ')}
            </p>
          </div>
        </div>

        {/* Collect Button */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Collect game
        </Button>

        {/* Rating & Release */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>Rating: {gameData.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Release: {formattedReleaseDate}</span>
          </div>
        </div>

        {/* Genre */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Genre:</span>
          <span>{gameData.genres.map((genre) => genre.name).join(', ')}</span>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h2 className="font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">{gameData.summary}</p>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <h2 className="font-semibold">Platforms</h2>
          <p className="text-sm text-muted-foreground">
            {gameData.platforms.map((platform) => platform.name).join(', ')}
          </p>
        </div>

        {/* Media */}
        <div className="space-y-2">
          <h2 className="font-semibold">Media</h2>
          <ImageGallery title="Media" images={gameData.screenshots} />
        </div>

        {/* Similar Games */}
        <div className="space-y-2">
          <h2 className="font-semibold">Similar games</h2>
          <div className="grid grid-cols-3 gap-2">
            {gameData.similar_games.map((game) => (
              <div key={game.id} className="aspect-[3/4] relative">
                <CustomImage
                  src={game.cover.url}
                  alt={game.name}
                  className="rounded-lg object-cover"
                  size="cover_big"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
