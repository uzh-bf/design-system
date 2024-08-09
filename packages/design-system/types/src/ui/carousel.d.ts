import { default as useEmblaCarousel, UseEmblaCarouselType } from 'embla-carousel-react';
import { ButtonProps } from './button';
import * as React from 'react';
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};
declare const Carousel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & CarouselProps & React.RefAttributes<HTMLDivElement>>;
declare const CarouselContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CarouselPrevious: React.ForwardRefExoticComponent<Omit< ButtonProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: React.ForwardRefExoticComponent<Omit< ButtonProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi, };
