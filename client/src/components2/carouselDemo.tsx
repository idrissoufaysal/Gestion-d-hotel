import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo({items}:{items:{src:string}[]}) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Carousel className="w-[800px]">
        <CarouselContent className="">

          {Array.from({ length: items.length }).map((_, index) => (
            <CarouselItem key={index} >
              <div className="p-1">
                <Card className=" bg-red-300">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      className="object-cover w-full h-full"
                      src={items[index].src}
                      alt="Carousel item"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel >
    </div>
  );
}
