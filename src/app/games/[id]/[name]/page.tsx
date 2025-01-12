import React from 'react';
import { Metadata } from 'next';
import { generateSlug } from '@/lib/slugify.lib';
import CustomImage from '@/components/custom-image';
import { Star, Calendar, PuzzleIcon } from 'lucide-react';
import { fetchGameDetails } from '@/services/api.service';
import { getAccessToken } from '@/services/auth.service';
import { ImageGallery } from '@/components/image-gallery';
import Typography from '@/components/typography';
import { Chip } from '@/components/ui/chip';
import Link from 'next/link';
import { CollectButton } from '@/components/collect-button';

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

  const formattedReleaseDate = gameData.first_release_date
    ? new Date(gameData.first_release_date * 1000).toLocaleDateString()
    : 'No date available';

  return (
    <div className="flex flex-col w-full max-w-md mx-auto min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex gap-3">
          <CustomImage
            src={gameData.cover.url}
            alt={gameData.name}
            size="cover_small"
            className="rounded-xl"
          />
          <div>
            <Typography.H1>{gameData.name}</Typography.H1>
            <Typography.H3>
              {gameData.involved_companies
                .map((company) => company.company.name)
                .join(', ')}
            </Typography.H3>
          </div>
        </div>

        <CollectButton
          id={gameData.id}
          name={gameData.name}
          image={gameData.cover.url}
          first_release_date={gameData.first_release_date}
        />

        {/* Rating & Release */}
        <div className="flex flex-wrap gap-2">
          <Chip
            icon={<Star className="w-4 h-4" />}
            label="Rating"
            value={gameData.rating.toFixed(1)}
          />
          <Chip
            icon={<Calendar className="w-4 h-4" />}
            label="Release"
            value={formattedReleaseDate}
          />
          <Chip
            icon={<PuzzleIcon className="w-4 h-4" />}
            label="Genre"
            value={gameData.genres.map((genre) => genre.name).join(', ')}
          />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Typography.H2>Summary</Typography.H2>
          <Typography.H4>{gameData.summary}</Typography.H4>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Typography.H2>Platforms</Typography.H2>
          <Typography.H4>
            {gameData.platforms.map((platform) => platform.name).join(', ')}
          </Typography.H4>
        </div>

        {/* Media */}
        {gameData.screenshots.length > 0 && (
          <div className="space-y-2">
            <Typography.H2>Media</Typography.H2>
            <ImageGallery title="Media" images={gameData.screenshots} />
          </div>
        )}

        {/* Similar Games */}
        <div className="space-y-2">
          <Typography.H2 className="bg-gradient-to-l from-violet-600 to-violet-900 bg-clip-text text-transparent">
            Similar games
          </Typography.H2>
          <div className="grid grid-cols-3 gap-2">
            {gameData.similar_games.map((game) => (
              <Link
                href={`/games/${game.id}/${generateSlug(game.name)}`}
                key={game.id}
                className="aspect-[3/4] relative hover:scale-105 hover:shadow-lg transition-transform"
              >
                <CustomImage
                  src={game.cover?.url}
                  alt={game.name}
                  className="rounded-lg object-cover"
                  size="cover_big"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
