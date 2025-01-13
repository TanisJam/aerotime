'use client';

import { useState } from 'react';
import CustomImage from '@/components/custom-image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Cover } from '@/models';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ImageGalleryProps {
  images: Cover[];
  title?: string;
}

export function ImageGallery({ images, title = 'Media' }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-2  basis-1/4 md:basis-1/12">
              <div
                className="relative rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <CustomImage
                  src={image.url}
                  alt={title}
                  size="thumb"
                  className="object-cover rounded-lg transition-transform hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogTitle hidden>{title}</DialogTitle>
        <DialogDescription>
          {selectedImage !== null && `${selectedImage + 1} of ${images.length}`}
        </DialogDescription>
        <DialogContent className="max-w-7xl w-full  p-0 border-none bg-background/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-4 w-4" />
          </Button>

          <Carousel
            opts={{
              startIndex: selectedImage ?? 0,
              loop: true,
            }}
            className="w-full "
          >
            <CarouselContent className="md:max-h-[720px]">
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full flex items-center justify-center">
                    <CustomImage
                      src={image.url}
                      alt={title}
                      size="1080p"
                      className="object-cover"
                      priority
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
