/**
 * @fileoverview added by tsickle
 * Generated from: lib/carousel.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
export class MatCarouselHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
    }
}
MatCarouselHammerConfig.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    MatCarouselHammerConfig.prototype.overrides;
}
export class MatCarouselModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MatCarouselModule,
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
            ]
        };
    }
}
MatCarouselModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                imports: [CommonModule, MatButtonModule, MatIconModule, HammerModule],
                exports: [MatCarouselComponent, MatCarouselSlideComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL2Nhcm91c2VsL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jYXJvdXNlbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsWUFBWSxFQUNiLE1BQU0sMkJBQTJCLENBQUM7QUFHbkMsTUFBTSxPQUFPLHVCQUF3QixTQUFRLG1CQUFtQjtJQURoRTs7UUFFRSxjQUFTLEdBQUc7WUFDVixLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBQ3hCLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDMUIsQ0FBQztJQUNKLENBQUM7OztZQU5BLFVBQVU7Ozs7SUFFVCw0Q0FHRTs7QUFPSixNQUFNLE9BQU8saUJBQWlCOzs7O0lBQzVCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTthQUN0RTtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFiRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUM7Z0JBQy9ELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztnQkFDckUsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUM7YUFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtc2xpZGUvY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIEhhbW1lckdlc3R1cmVDb25maWcsXG4gIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyxcbiAgSGFtbWVyTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxIYW1tZXJDb25maWcgZXh0ZW5kcyBIYW1tZXJHZXN0dXJlQ29uZmlnIHtcbiAgb3ZlcnJpZGVzID0ge1xuICAgIHBpbmNoOiB7IGVuYWJsZTogZmFsc2UgfSxcbiAgICByb3RhdGU6IHsgZW5hYmxlOiBmYWxzZSB9XG4gIH07XG59XG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNYXRDYXJvdXNlbENvbXBvbmVudCwgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgSGFtbWVyTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENhcm91c2VsQ29tcG9uZW50LCBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TWF0Q2Fyb3VzZWxNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdENhcm91c2VsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogSEFNTUVSX0dFU1RVUkVfQ09ORklHLCB1c2VDbGFzczogTWF0Q2Fyb3VzZWxIYW1tZXJDb25maWcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==