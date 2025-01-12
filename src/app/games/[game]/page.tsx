'use client';
import React from 'react';
import CustomImage from '@/components/custom-image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function Page({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const [game, setGame] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setGame(resolvedParams.game);
    });
  }, [params]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex gap-3">
          <CustomImage
            src="/placeholder.svg"
            alt="Grand Theft Auto V"
            width={64}
            height={64}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-xl font-semibold">Grand Theft Auto V</h1>
            <p className="text-sm text-muted-foreground">Rockstar Games</p>
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
            <span>Rating: 8.9</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Release: 9/16/2013</span>
          </div>
        </div>

        {/* Genre */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Genre:</span>
          <span>Card & Board Game</span>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h2 className="font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">
            Grand Theft Auto V is a vast open world game set in Los Santos, a
            sprawling sun-soaked metropolis struggling to stay afloat in an era
            of economic uncertainty and cheap reality TV. The game blends
            storytelling and gameplay in new ways as players repeatedly jump in
            and out of the lives of the game&apos;s three lead characters,
            playing all sides of the game&apos;s interwoven story.
          </p>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <h2 className="font-semibold">Platforms</h2>
          <p className="text-sm text-muted-foreground">
            PC (Microsoft Windows), PlayStation 3, PlayStation 4, Xbox 360, Xbox
            One
          </p>
        </div>

        {/* Media */}
        <div className="space-y-2">
          <h2 className="font-semibold">Media</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex gap-2 p-1">
              {[1, 2, 3, 4].map((i) => (
                <CustomImage
                  key={i}
                  src="/placeholder.svg"
                  alt={`Screenshot ${i}`}
                  width={200}
                  height={120}
                  className="rounded-lg object-cover aspect-video"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Similar Games */}
        <div className="space-y-2">
          <h2 className="font-semibold">Similar games</h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] relative">
                <CustomImage
                  src="/placeholder.svg"
                  alt={`Similar Game ${i}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
