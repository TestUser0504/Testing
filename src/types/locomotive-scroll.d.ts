// Create this file at src/types/locomotive-scroll.d.ts
declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    name?: string;
    offset?: [number, number];
    repeat?: boolean;
    smooth?: boolean | number;
    smoothMobile?: boolean;
    direction?: string;
    inertia?: number;
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    resetNativeScroll?: boolean;
    tablet?: {
      smooth?: boolean;
      direction?: string;
      breakpoint?: number;
    };
    smartphone?: {
      smooth?: boolean;
      direction?: string;
    };
  }

  export interface LocomotiveScrollInstance {
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
    scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number; easing?: [number, number, number, number]; disableLerp?: boolean; callback?: () => void }): void;
    scrollTo(target: string | number | HTMLElement, offset?: number, duration?: number, easing?: [number, number, number, number], disableLerp?: boolean, callback?: () => void): void;
    update(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    on(event: string, callback: (data?: any) => void): void;
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    destroy(): void;
    update(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number; easing?: [number, number, number, number]; disableLerp?: boolean; callback?: () => void }): void;
    scrollTo(target: string | number | HTMLElement, offset?: number, duration?: number, easing?: [number, number, number, number], disableLerp?: boolean, callback?: () => void): void;
    on(event: string, callback: (data?: any) => void): void;
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
  }
}