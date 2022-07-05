/**
 * @fileoverview added by tsickle
 * Generated from: lib/carousel.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild } from '@angular/core';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
/** @enum {number} */
const Direction = {
    left: 0,
    right: 1,
    index: 2,
};
Direction[Direction.left] = 'left';
Direction[Direction.right] = 'right';
Direction[Direction.index] = 'index';
export class MatCarouselComponent {
    /**
     * @param {?} animationBuilder
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(animationBuilder, renderer, platformId) {
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this.platformId = platformId;
        this.timings = '250ms ease-in';
        this.lazyLoad = false;
        this.hideArrows = true;
        this.hideIndicators = true;
        this.ariaLabel = 'Sliding carousel';
        this.color = 'accent';
        this.maintainAspectRatio = true;
        this.proportion = 25;
        this.slideHeight = '100%';
        this.useKeyboard = false;
        this.useMouseWheel = false;
        this.changeEmitter = new EventEmitter();
        this._autoplay = true;
        this.autoplay$ = new Subject();
        this.interval$ = new BehaviorSubject(5000);
        this.slides$ = new BehaviorSubject(null);
        this._maxWidth = 'auto';
        this.maxWidth$ = new Subject();
        this._loop = true;
        this.loop$ = new Subject();
        this._orientation = 'ltr';
        this.orientation$ = new Subject();
        this.timerStop$ = new Subject();
        this.destroy$ = new Subject();
        this.playing = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this.autoplay$.next(value);
        this._autoplay = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this.interval$.next(value);
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._loop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this.loop$.next(value);
        this._loop = value;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this._maxWidth;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxWidth(value) {
        this._maxWidth = value;
        this.maxWidth$.next();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set slides(value) {
        this.slides$.next(value);
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientation$.next(value);
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItemIndex;
        }
        return 0;
    }
    /**
     * @return {?}
     */
    get currentSlide() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItem;
        }
        return null;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        if (this.useKeyboard && !this.playing) {
            this.listKeyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.stopTimer();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.startTimer(this._autoplay);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        if (this.useMouseWheel) {
            event.preventDefault(); // prevent window to scroll
            // prevent window to scroll
            /** @type {?} */
            const deltaY = Math.sign(event.deltaY);
            if (deltaY > 0) {
                this.next();
            }
            else if (deltaY < 0) {
                this.previous();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        // Reset carousel when width is resized
        // in order to avoid major glitches.
        /** @type {?} */
        const w = this.getWidth();
        if (w !== this.width) {
            this.width = w;
            this.slideTo(0);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.lazyLoad) {
            this.slidesList.forEach((/**
             * @param {?} slide
             * @return {?}
             */
            (slide) => slide.load = true));
        }
        else {
            this.slidesList.first.load = true;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.slidesList.find((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => i === 1 % this.slidesList.length)).load = true;
                this.slidesList.find((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => i === (this.slidesList.length - 1) % this.slidesList.length)).load = true;
            }), this.interval$.getValue() / 2);
        }
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.playAnimation()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.width = this.getWidth();
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.stopTimer();
            this.startTimer(value);
        }));
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.stopTimer();
            this.resetTimer(value);
            this.startTimer(this._autoplay);
        }));
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.slideTo(0)));
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.listKeyManager.withWrap(value)));
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.listKeyManager.withHorizontalOrientation(value)));
        this.slides$
            .pipe(takeUntil(this.destroy$), filter((/**
         * @param {?} value
         * @return {?}
         */
        value => value && value < this.slidesList.length)))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.resetSlides(value)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @return {?}
     */
    next() {
        this.goto(Direction.right);
    }
    /**
     * @return {?}
     */
    previous() {
        this.goto(Direction.left);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    slideTo(index) {
        this.goto(Direction.index, index);
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPan(event, slideElem) {
        // https://github.com/angular/angular/issues/10541#issuecomment-346539242
        // if y velocity is greater, it's a panup/pandown, so ignore.
        if (Math.abs(event.velocityY) > Math.abs(event.velocityX)) {
            return;
        }
        /** @type {?} */
        let deltaX = event.deltaX;
        if (this.isOutOfBounds()) {
            deltaX *= 0.2; // decelerate movement;
        }
        this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
        this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + deltaX));
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPanEnd(event, slideElem) {
        this.renderer.removeStyle(slideElem, 'cursor');
        if (!this.isOutOfBounds() &&
            Math.abs(event.deltaX) > this.getWidth() * 0.25) {
            if (event.deltaX <= 0) {
                this.next();
                return;
            }
            this.previous();
            return;
        }
        this.playAnimation(); // slide back, don't change current index
    }
    /**
     * @private
     * @return {?}
     */
    isOutOfBounds() {
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? -1 : 1;
        /** @type {?} */
        const left = sign *
            (this.carouselList.nativeElement.getBoundingClientRect().left -
                this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                    .left);
        /** @type {?} */
        const lastIndex = this.slidesList.length - 1;
        /** @type {?} */
        const width = -this.getWidth() * lastIndex;
        return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
            (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
    }
    /**
     * @private
     * @return {?}
     */
    isVisible() {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        /** @type {?} */
        const elem = this.carouselContainer.nativeElement;
        /** @type {?} */
        const docViewTop = window.pageYOffset;
        /** @type {?} */
        const docViewBottom = docViewTop + window.innerHeight;
        /** @type {?} */
        const elemOffset = elem.getBoundingClientRect();
        /** @type {?} */
        const elemTop = docViewTop + elemOffset.top;
        /** @type {?} */
        const elemBottom = elemTop + elemOffset.height;
        return elemBottom <= docViewBottom || elemTop >= docViewTop;
    }
    /**
     * @private
     * @return {?}
     */
    getOffset() {
        /** @type {?} */
        const offset = this.listKeyManager.activeItemIndex * this.getWidth();
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? 1 : -1;
        return sign * offset;
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    getTranslation(offset) {
        return `translateX(${offset}px)`;
    }
    /**
     * @private
     * @return {?}
     */
    getWidth() {
        return this.carouselContainer.nativeElement.clientWidth;
    }
    /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    goto(direction, index) {
        if (!this.playing) {
            /** @type {?} */
            const rtl = this.orientation === 'rtl';
            switch (direction) {
                case Direction.left:
                    return rtl
                        ? this.listKeyManager.setNextItemActive()
                        : this.listKeyManager.setPreviousItemActive();
                case Direction.right:
                    return rtl
                        ? this.listKeyManager.setPreviousItemActive()
                        : this.listKeyManager.setNextItemActive();
                case Direction.index:
                    return this.listKeyManager.setActiveItem(index);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    playAnimation() {
        /** @type {?} */
        const translation = this.getTranslation(this.getOffset());
        /** @type {?} */
        const factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
        /** @type {?} */
        const animation = factory.create(this.carouselList.nativeElement);
        animation.onStart((/**
         * @return {?}
         */
        () => {
            this.playing = true;
        }));
        animation.onDone((/**
         * @return {?}
         */
        () => {
            this.changeEmitter.emit(this.currentIndex);
            this.playing = false;
            if (this.lazyLoad) {
                this.slidesList.find((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => i === (this.currentIndex + 1) % this.slidesList.length)).load = true;
                this.slidesList.find((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => i === (this.currentIndex - 1 + this.slidesList.length) % this.slidesList.length)).load = true;
                this.slidesList.find((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => i === this.currentIndex)).load = true;
            }
            this.renderer.setStyle(this.carouselList.nativeElement, 'transform', translation);
            animation.destroy();
        }));
        animation.play();
    }
    /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    resetSlides(slides) {
        this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    resetTimer(value) {
        this.timer$ = interval(value);
    }
    /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    startTimer(autoplay) {
        if (!autoplay) {
            return;
        }
        this.timer$
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter((/**
         * @return {?}
         */
        () => this.isVisible())))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.listKeyManager.withWrap(true).setNextItemActive();
            this.listKeyManager.withWrap(this.loop);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    stopTimer() {
        this.timerStop$.next();
    }
}
MatCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel',
                template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n  [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [attr.aria-label]=\"ariaLabel\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n    [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      [style.padding-bottom]=\"maintainAspectRatio && proportion ? proportion + '%': '0px'\"\n      [style.height]=\"!maintainAspectRatio && slideHeight ? slideHeight : '0px'\"\n      (panleft)=\"onPan($event, carouselSlide)\"\n      (panright)=\"onPan($event, carouselSlide)\"\n      (panend)=\"onPanEnd($event, carouselSlide)\"\n      (pancancel)=\"onPanEnd($event, carouselSlide)\"\n    >\n      <ng-container *ngIf=\"slide.load\" [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    aria-label=\"Previous slide\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    aria-label=\"Next slide\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [attr.aria-label]=\"'Slide #' + i\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
                styles: [".carousel{outline:none;overflow:hidden;position:relative;width:100%}.carousel>button{position:absolute;top:50%;transform:translateY(-50%);z-index:1}.carousel>button:first-of-type{left:30px}.carousel>button:last-of-type{right:30px}.carousel-list{list-style:none;margin:0;padding:0}.carousel-list,.carousel-slide{display:flex;position:relative;width:100%}.carousel-slide{flex-shrink:0;height:0}.carousel-slide:hover{cursor:-webkit-grab;cursor:grab}.carousel-indicators{bottom:15px;display:flex;left:50%;outline:none;position:absolute;transform:translateX(-50%);z-index:1}.carousel-indicators>button{height:10px;margin:7.5px;width:10px}"]
            }] }
];
/** @nocollapse */
MatCarouselComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MatCarouselComponent.propDecorators = {
    timings: [{ type: Input }],
    lazyLoad: [{ type: Input }],
    svgIconOverrides: [{ type: Input }],
    autoplay: [{ type: Input }],
    interval: [{ type: Input }],
    loop: [{ type: Input }],
    hideArrows: [{ type: Input }],
    hideIndicators: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    color: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maintainAspectRatio: [{ type: Input }],
    proportion: [{ type: Input }],
    slideHeight: [{ type: Input }],
    slides: [{ type: Input }],
    useKeyboard: [{ type: Input }],
    useMouseWheel: [{ type: Input }],
    orientation: [{ type: Input }],
    changeEmitter: [{ type: Output }],
    slidesList: [{ type: ContentChildren, args: [MatCarouselSlideComponent,] }],
    carouselContainer: [{ type: ViewChild, args: ['carouselContainer',] }],
    carouselList: [{ type: ViewChild, args: ['carouselList',] }],
    onKeyUp: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }],
    onMouseWheel: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MatCarouselComponent.prototype.timings;
    /** @type {?} */
    MatCarouselComponent.prototype.lazyLoad;
    /** @type {?} */
    MatCarouselComponent.prototype.svgIconOverrides;
    /** @type {?} */
    MatCarouselComponent.prototype.hideArrows;
    /** @type {?} */
    MatCarouselComponent.prototype.hideIndicators;
    /** @type {?} */
    MatCarouselComponent.prototype.ariaLabel;
    /** @type {?} */
    MatCarouselComponent.prototype.color;
    /** @type {?} */
    MatCarouselComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    MatCarouselComponent.prototype.proportion;
    /** @type {?} */
    MatCarouselComponent.prototype.slideHeight;
    /** @type {?} */
    MatCarouselComponent.prototype.useKeyboard;
    /** @type {?} */
    MatCarouselComponent.prototype.useMouseWheel;
    /** @type {?} */
    MatCarouselComponent.prototype.changeEmitter;
    /** @type {?} */
    MatCarouselComponent.prototype.slidesList;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselContainer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselList;
    /** @type {?} */
    MatCarouselComponent.prototype.listKeyManager;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._autoplay;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.autoplay$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.interval$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.slides$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._maxWidth;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.maxWidth$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._loop;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.loop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.orientation$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timer$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timerStop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.playing;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.width;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.animationBuilder;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL2Nhcm91c2VsL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBR0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRXRGLE1BQUssU0FBUztJQUNaLElBQUksR0FBQTtJQUNKLEtBQUssR0FBQTtJQUNMLEtBQUssR0FBQTtFQUNOOzs7O0FBT0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBK0cvQixZQUNVLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNFLFVBQVU7UUFGL0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBQTtRQWhIekIsWUFBTyxHQUFHLGVBQWUsQ0FBQztRQUMxQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBdUJqQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixVQUFLLEdBQWlCLFFBQVEsQ0FBQztRQVcvQix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLE1BQU0sQ0FBQztRQU9yQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVkvQixrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBMEJoRSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBRW5DLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUM5QyxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFFNUMsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUVqQyxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBSyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFFL0IsaUJBQVksR0FBZ0IsS0FBSyxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQWUsQ0FBQztRQUcxQyxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUVsQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUNoQyxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUXJCLENBQUM7Ozs7O0lBN0dKLElBQ1csUUFBUSxDQUFDLEtBQWM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxJQUNXLFFBQVEsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFDRCxJQUNXLElBQUksQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFPRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBQ0QsSUFDVyxRQUFRLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBTUQsSUFDVyxNQUFNLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBS0QsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQ1csV0FBVyxDQUFDLEtBQWtCO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFLRCxJQUFXLFlBQVk7UUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUM7U0FDNUM7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFDRCxJQUFXLFlBQVk7UUFDckIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBeUNNLE9BQU8sQ0FBQyxLQUFvQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7OztJQUdNLFlBQVk7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFHTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBR00sWUFBWSxDQUFDLEtBQWlCO1FBQ25DLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQywyQkFBMkI7OztrQkFDN0MsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUV0QyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7aUJBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7U0FDRjtJQUNILENBQUM7Ozs7O0lBR00sUUFBUSxDQUFDLEtBQVk7Ozs7Y0FHcEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDekIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakI7SUFDSCxDQUFDOzs7O0lBRU0sa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLFVBQVU7OztZQUFFLEdBQUcsRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTs7Ozs7Z0JBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDM0csQ0FBQyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDdEQsdUJBQXVCLENBQUMsS0FBSyxDQUFDO2FBQzlCLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTthQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTO2FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWTthQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsT0FBTzthQUNULElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QixNQUFNOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQ3pEO2FBQ0EsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFTSxPQUFPLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU0sS0FBSyxDQUFDLEtBQVUsRUFBRSxTQUFzQjtRQUM3Qyx5RUFBeUU7UUFDekUsNkRBQTZEO1FBQzdELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekQsT0FBTztTQUNSOztZQUNHLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtRQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsdUJBQXVCO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQy9CLFdBQVcsRUFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FDL0MsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVNLFFBQVEsQ0FBQyxLQUFVLEVBQUUsU0FBc0I7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9DLElBQ0UsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLEVBQy9DO1lBQ0EsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNaLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyx5Q0FBeUM7SUFDakUsQ0FBQzs7Ozs7SUFFTyxhQUFhOztjQUNiLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBQzFDLElBQUksR0FDUixJQUFJO1lBQ0osQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUk7Z0JBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtxQkFDakUsSUFBSSxDQUFDOztjQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDOztjQUN0QyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUztRQUUxQyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztZQUN4RCxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxLQUFLLFNBQVMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQ3JFLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLFNBQVM7UUFDZixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O2NBRUssSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhOztjQUMzQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVc7O2NBQy9CLGFBQWEsR0FBRyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVc7O2NBQy9DLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUU7O2NBQ3pDLE9BQU8sR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUc7O2NBQ3JDLFVBQVUsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU07UUFFOUMsT0FBTyxVQUFVLElBQUksYUFBYSxJQUFJLE9BQU8sSUFBSSxVQUFVLENBQUM7SUFDOUQsQ0FBQzs7Ozs7SUFFTyxTQUFTOztjQUNULE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFOztjQUM5RCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsTUFBYztRQUNuQyxPQUFPLGNBQWMsTUFBTSxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7O0lBRU8sSUFBSSxDQUFDLFNBQW9CLEVBQUUsS0FBYztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7a0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSztZQUV0QyxRQUFRLFNBQVMsRUFBRTtnQkFDakIsS0FBSyxTQUFTLENBQUMsSUFBSTtvQkFDakIsT0FBTyxHQUFHO3dCQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO3dCQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUNsRCxLQUFLLFNBQVMsQ0FBQyxLQUFLO29CQUNsQixPQUFPLEdBQUc7d0JBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUU7d0JBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzlDLEtBQUssU0FBUyxDQUFDLEtBQUs7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkQ7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sYUFBYTs7Y0FDYixXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O2NBQ25ELE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUN6RDs7Y0FDSyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVqRSxTQUFTLENBQUMsT0FBTzs7O1FBQUMsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLE1BQU07OztRQUFDLEdBQUcsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3BHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTs7Ozs7Z0JBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDOUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOzs7OztnQkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUN0RTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFDL0IsV0FBVyxFQUNYLFdBQVcsQ0FDWixDQUFDO1lBQ0YsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxNQUFjO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7OztJQUVPLFVBQVUsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUVPLFVBQVUsQ0FBQyxRQUFpQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU07YUFDUixJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDeEIsTUFBTTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLENBQy9CO2FBQ0EsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLFNBQVM7UUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7OztZQXpZRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDRrRkFBd0M7O2FBRXpDOzs7O1lBckN3QixnQkFBZ0I7WUFpQnZDLFNBQVM7NENBdUlOLE1BQU0sU0FBQyxXQUFXOzs7c0JBaEhwQixLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFFTCxLQUFLO3VCQU1MLEtBQUs7bUJBUUwsS0FBSzt5QkFNTCxLQUFLOzZCQUNMLEtBQUs7d0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUtMLEtBQUs7a0NBTUwsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsS0FBSzswQkFLTCxLQUFLOzRCQUNMLEtBQUs7MEJBS0wsS0FBSzs0QkFNTCxNQUFNO3lCQWtCTixlQUFlLFNBQUMseUJBQXlCO2dDQUd6QyxTQUFTLFNBQUMsbUJBQW1COzJCQUc3QixTQUFTLFNBQUMsY0FBYztzQkFnQ3hCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBT2hDLFlBQVksU0FBQyxZQUFZOzJCQUt6QixZQUFZLFNBQUMsWUFBWTsyQkFLekIsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzt1QkFjckMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQWxKekMsdUNBQTBDOztJQUMxQyx3Q0FBaUM7O0lBQ2pDLGdEQUFtRDs7SUFzQm5ELDBDQUFrQzs7SUFDbEMsOENBQXNDOztJQUN0Qyx5Q0FBK0M7O0lBQy9DLHFDQUErQzs7SUFXL0MsbURBQTJDOztJQUMzQywwQ0FBZ0M7O0lBQ2hDLDJDQUFxQzs7SUFPckMsMkNBQW9DOztJQUNwQyw2Q0FBc0M7O0lBV3RDLDZDQUN3RTs7SUFpQnhFLDBDQUVFOzs7OztJQUNGLGlEQUVFOzs7OztJQUNGLDRDQUF5RTs7SUFDekUsOENBQWlFOzs7OztJQUVqRSx5Q0FBeUI7Ozs7O0lBQ3pCLHlDQUEyQzs7Ozs7SUFFM0MseUNBQXNEOzs7OztJQUN0RCx1Q0FBb0Q7Ozs7O0lBRXBELHlDQUEyQjs7Ozs7SUFDM0IseUNBQXlDOzs7OztJQUV6QyxxQ0FBcUI7Ozs7O0lBQ3JCLHFDQUF1Qzs7Ozs7SUFFdkMsNENBQTBDOzs7OztJQUMxQyw0Q0FBa0Q7Ozs7O0lBRWxELHNDQUFtQzs7Ozs7SUFDbkMsMENBQTBDOzs7OztJQUUxQyx3Q0FBd0M7Ozs7O0lBQ3hDLHVDQUF3Qjs7Ozs7SUFFeEIscUNBQXNCOzs7OztJQUdwQixnREFBMEM7Ozs7O0lBQzFDLHdDQUEyQjs7Ozs7SUFDM0IsMENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIEFuaW1hdGlvbkJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbCwgT3JpZW50YXRpb24sIFN2Z0ljb25PdmVycmlkZXMgfSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudCc7XG5cbmVudW0gRGlyZWN0aW9uIHtcbiAgbGVmdCxcbiAgcmlnaHQsXG4gIGluZGV4XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBNYXRDYXJvdXNlbCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHRpbWluZ3MgPSAnMjUwbXMgZWFzZS1pbic7XG4gIEBJbnB1dCgpIHB1YmxpYyBsYXp5TG9hZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc3ZnSWNvbk92ZXJyaWRlczogU3ZnSWNvbk92ZXJyaWRlcztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5hdXRvcGxheSQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuaW50ZXJ2YWwkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb29wO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbG9vcCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMubG9vcCQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fbG9vcCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIGhpZGVBcnJvd3MgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZUluZGljYXRvcnMgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgYXJpYUxhYmVsID0gJ1NsaWRpbmcgY2Fyb3VzZWwnO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIHB1YmxpYyBnZXQgbWF4V2lkdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4V2lkdGg7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXhXaWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWF4V2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLm1heFdpZHRoJC5uZXh0KCk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcm9wb3J0aW9uID0gMjU7XG4gIEBJbnB1dCgpIHB1YmxpYyBzbGlkZUhlaWdodCA9ICcxMDAlJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNsaWRlcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zbGlkZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHVzZUtleWJvYXJkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VNb3VzZVdoZWVsID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBvcmllbnRhdGlvbigpOiBPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgb3JpZW50YXRpb24odmFsdWU6IE9yaWVudGF0aW9uKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2hhbmdlRW1pdHRlcjogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcHVibGljIGdldCBjdXJyZW50U2xpZGUoKTogTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMubGlzdEtleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQpIHB1YmxpYyBzbGlkZXNMaXN0OiBRdWVyeUxpc3Q8XG4gICAgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudFxuICA+O1xuICBAVmlld0NoaWxkKCdjYXJvdXNlbENvbnRhaW5lcicpIHByaXZhdGUgY2Fyb3VzZWxDb250YWluZXI6IEVsZW1lbnRSZWY8XG4gICAgSFRNTERpdkVsZW1lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxMaXN0JykgcHJpdmF0ZSBjYXJvdXNlbExpc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBwdWJsaWMgbGlzdEtleU1hbmFnZXI6IExpc3RLZXlNYW5hZ2VyPE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBhdXRvcGxheSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgaW50ZXJ2YWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDUwMDApO1xuICBwcml2YXRlIHNsaWRlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfbWF4V2lkdGggPSAnYXV0byc7XG4gIHByaXZhdGUgbWF4V2lkdGgkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG5cbiAgcHJpdmF0ZSBfbG9vcCA9IHRydWU7XG4gIHByaXZhdGUgbG9vcCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBPcmllbnRhdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIG9yaWVudGF0aW9uJCA9IG5ldyBTdWJqZWN0PE9yaWVudGF0aW9uPigpO1xuXG4gIHByaXZhdGUgdGltZXIkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgdGltZXJTdG9wJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcbiAgcHJpdmF0ZSBwbGF5aW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkXG4gICkge31cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlS2V5Ym9hcmQgJiYgIXRoaXMucGxheWluZykge1xuICAgICAgdGhpcy5saXN0S2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBwdWJsaWMgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgcHVibGljIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0VGltZXIodGhpcy5fYXV0b3BsYXkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V3aGVlbCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VNb3VzZVdoZWVsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHdpbmRvdyB0byBzY3JvbGxcbiAgICAgIGNvbnN0IGRlbHRhWSA9IE1hdGguc2lnbihldmVudC5kZWx0YVkpO1xuXG4gICAgICBpZiAoZGVsdGFZID4gMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVsdGFZIDwgMCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBSZXNldCBjYXJvdXNlbCB3aGVuIHdpZHRoIGlzIHJlc2l6ZWRcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBtYWpvciBnbGl0Y2hlcy5cbiAgICBjb25zdCB3ID0gdGhpcy5nZXRXaWR0aCgpO1xuICAgIGlmICh3ICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgIHRoaXMuc2xpZGVUbygwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sYXp5TG9hZCkge1xuICAgICAgdGhpcy5zbGlkZXNMaXN0LmZvckVhY2goIChzbGlkZSkgPT4gc2xpZGUubG9hZCA9IHRydWUgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbGlkZXNMaXN0LmZpcnN0LmxvYWQgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLnNsaWRlc0xpc3QuZmluZCggKHMsIGkpID0+IGkgPT09IDEgJSB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoKS5sb2FkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zbGlkZXNMaXN0LmZpbmQoIChzLCBpKSA9PiBpID09PSAodGhpcy5zbGlkZXNMaXN0Lmxlbmd0aCAtIDEpICUgdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aCkubG9hZCA9IHRydWU7XG4gICAgICB9LCB0aGlzLmludGVydmFsJC5nZXRWYWx1ZSgpIC8gMik7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0S2V5TWFuYWdlciA9IG5ldyBMaXN0S2V5TWFuYWdlcih0aGlzLnNsaWRlc0xpc3QpXG4gICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oZmFsc2UpXG4gICAgICAud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9vcmllbnRhdGlvbilcbiAgICAgIC53aXRoV3JhcCh0aGlzLl9sb29wKTtcblxuICAgIHRoaXMubGlzdEtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcblxuICAgIHRoaXMubGlzdEtleU1hbmFnZXIuY2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucGxheUFuaW1hdGlvbigpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcblxuICAgIHRoaXMuYXV0b3BsYXkkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVydmFsJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnJlc2V0VGltZXIodmFsdWUpO1xuICAgICAgdGhpcy5zdGFydFRpbWVyKHRoaXMuX2F1dG9wbGF5KTtcbiAgICB9KTtcblxuICAgIHRoaXMubWF4V2lkdGgkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2xpZGVUbygwKSk7XG5cbiAgICB0aGlzLmxvb3AkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodmFsdWUpKTtcblxuICAgIHRoaXMub3JpZW50YXRpb24kXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMubGlzdEtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih2YWx1ZSkpO1xuXG4gICAgdGhpcy5zbGlkZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgJiYgdmFsdWUgPCB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnJlc2V0U2xpZGVzKHZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5yaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5sZWZ0KTtcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZVRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG8oRGlyZWN0aW9uLmluZGV4LCBpbmRleCk7XG4gIH1cblxuICBwdWJsaWMgb25QYW4oZXZlbnQ6IGFueSwgc2xpZGVFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwNTQxI2lzc3VlY29tbWVudC0zNDY1MzkyNDJcbiAgICAvLyBpZiB5IHZlbG9jaXR5IGlzIGdyZWF0ZXIsIGl0J3MgYSBwYW51cC9wYW5kb3duLCBzbyBpZ25vcmUuXG4gICAgaWYgKE1hdGguYWJzKGV2ZW50LnZlbG9jaXR5WSkgPiBNYXRoLmFicyhldmVudC52ZWxvY2l0eVgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBkZWx0YVggPSBldmVudC5kZWx0YVg7XG4gICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICBkZWx0YVggKj0gMC4yOyAvLyBkZWNlbGVyYXRlIG1vdmVtZW50O1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc2xpZGVFbGVtLCAnY3Vyc29yJywgJ2dyYWJiaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIHRoaXMuZ2V0VHJhbnNsYXRpb24odGhpcy5nZXRPZmZzZXQoKSArIGRlbHRhWClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuRW5kKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicpO1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNPdXRPZkJvdW5kcygpICYmXG4gICAgICBNYXRoLmFicyhldmVudC5kZWx0YVgpID4gdGhpcy5nZXRXaWR0aCgpICogMC4yNVxuICAgICkge1xuICAgICAgaWYgKGV2ZW50LmRlbHRhWCA8PSAwKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGxheUFuaW1hdGlvbigpOyAvLyBzbGlkZSBiYWNrLCBkb24ndCBjaGFuZ2UgY3VycmVudCBpbmRleFxuICB9XG5cbiAgcHJpdmF0ZSBpc091dE9mQm91bmRzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbiAgICBjb25zdCBsZWZ0ID1cbiAgICAgIHNpZ24gKlxuICAgICAgKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgLmxlZnQpO1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuc2xpZGVzTGlzdC5sZW5ndGggLSAxO1xuICAgIGNvbnN0IHdpZHRoID0gLXRoaXMuZ2V0V2lkdGgoKSAqIGxhc3RJbmRleDtcblxuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IDAgJiYgbGVmdCA+PSAwKSB8fFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSBsYXN0SW5kZXggJiYgbGVmdCA8PSB3aWR0aClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbSA9IHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBkb2NWaWV3VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IGRvY1ZpZXdCb3R0b20gPSBkb2NWaWV3VG9wICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1PZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsZW1Ub3AgPSBkb2NWaWV3VG9wICsgZWxlbU9mZnNldC50b3A7XG4gICAgY29uc3QgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtT2Zmc2V0LmhlaWdodDtcblxuICAgIHJldHVybiBlbGVtQm90dG9tIDw9IGRvY1ZpZXdCb3R0b20gfHwgZWxlbVRvcCA+PSBkb2NWaWV3VG9wO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPZmZzZXQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCAqIHRoaXMuZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAxIDogLTE7XG4gICAgcmV0dXJuIHNpZ24gKiBvZmZzZXQ7XG4gIH1cblxuICBwcml2YXRlIGdldFRyYW5zbGF0aW9uKG9mZnNldDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBnb3RvKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF5aW5nKSB7XG4gICAgICBjb25zdCBydGwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAncnRsJztcblxuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24ubGVmdDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5yaWdodDpcbiAgICAgICAgICByZXR1cm4gcnRsXG4gICAgICAgICAgICA/IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICBjYXNlIERpcmVjdGlvbi5pbmRleDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBsYXlBbmltYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICBhbmltYXRlKHRoaXMudGltaW5ncywgc3R5bGUoeyB0cmFuc2Zvcm06IHRyYW5zbGF0aW9uIH0pKVxuICAgICk7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gZmFjdG9yeS5jcmVhdGUodGhpcy5jYXJvdXNlbExpc3QubmF0aXZlRWxlbWVudCk7XG5cbiAgICBhbmltYXRpb24ub25TdGFydCgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgIH0pO1xuICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VFbWl0dGVyLmVtaXQodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5sYXp5TG9hZCkge1xuICAgICAgICB0aGlzLnNsaWRlc0xpc3QuZmluZCggKHMsIGkpID0+IGkgPT09ICh0aGlzLmN1cnJlbnRJbmRleCArIDEpICUgdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aCkubG9hZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2xpZGVzTGlzdC5maW5kKCAocywgaSkgPT4gaSA9PT0gKHRoaXMuY3VycmVudEluZGV4IC0gMSArIHRoaXMuc2xpZGVzTGlzdC5sZW5ndGgpICAlIHRoaXMuc2xpZGVzTGlzdC5sZW5ndGgpLmxvYWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNsaWRlc0xpc3QuZmluZCggKHMsIGkpID0+IGkgPT09IHRoaXMuY3VycmVudEluZGV4KS5sb2FkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2xhdGlvblxuICAgICAgKTtcbiAgICAgIGFuaW1hdGlvbi5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTbGlkZXMoc2xpZGVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlc0xpc3QucmVzZXQodGhpcy5zbGlkZXNMaXN0LnRvQXJyYXkoKS5zbGljZSgwLCBzbGlkZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaW1lcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lciQgPSBpbnRlcnZhbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VGltZXIoYXV0b3BsYXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWF1dG9wbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50aW1lciRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50aW1lclN0b3AkKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc1Zpc2libGUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRydWUpLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodGhpcy5sb29wKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wVGltZXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN0b3AkLm5leHQoKTtcbiAgfVxufVxuIl19