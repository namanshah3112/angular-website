import { ThemePalette } from '@angular/material/core';
export interface MatCarousel {
    timings: string;
    autoplay: boolean;
    interval: number;
    loop: boolean;
    hideArrows: boolean;
    hideIndicators: boolean;
    color: ThemePalette;
    maxWidth: string;
    proportion: number;
    slides: number;
    svgIconOverrides: SvgIconOverrides;
    lazyLoad: boolean;
    useKeyboard: boolean;
    useMouseWheel: boolean;
    orientation: Orientation;
    ariaLabel: string;
}
export declare type Orientation = 'ltr' | 'rtl';
export interface SvgIconOverrides {
    arrowBack: string;
    arrowForward: string;
}
