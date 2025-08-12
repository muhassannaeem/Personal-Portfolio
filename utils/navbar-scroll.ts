/**
 * Enhanced scroll utilities for navbar behavior
 * Optional utility functions for smoother navbar transitions
 */

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  direction: 'up' | 'down' | null;
}

export class NavbarScrollHandler {
  private scrollThreshold: number;
  private lastScrollY: number = 0;
  private callbacks: Array<(state: ScrollState) => void> = [];
  private rafId: number | null = null;

  constructor(threshold: number = 40) {
    this.scrollThreshold = threshold;
  }

  /**
   * Register a callback for scroll state changes
   */
  subscribe(callback: (state: ScrollState) => void): () => void {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Start listening to scroll events
   */
  start(): void {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  /**
   * Stop listening to scroll events
   */
  stop(): void {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private handleScroll = (): void => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > this.scrollThreshold;
      
      let direction: 'up' | 'down' | null = null;
      if (currentScrollY > this.lastScrollY) {
        direction = 'down';
      } else if (currentScrollY < this.lastScrollY) {
        direction = 'up';
      }

      const scrollState: ScrollState = {
        isScrolled,
        scrollY: currentScrollY,
        direction
      };

      // Notify all subscribers
      this.callbacks.forEach(callback => callback(scrollState));
      
      this.lastScrollY = currentScrollY;
    });
  };
}

/**
 * React hook for navbar scroll behavior
 * Usage in React component:
 * 
 * const { isScrolled, scrollY, direction } = useNavbarScroll(40);
 */
export function useNavbarScroll(threshold: number = 40) {
  const [state, setState] = React.useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    direction: null
  });

  React.useEffect(() => {
    const handler = new NavbarScrollHandler(threshold);
    
    const unsubscribe = handler.subscribe(setState);
    handler.start();

    return () => {
      unsubscribe();
      handler.stop();
    };
  }, [threshold]);

  return state;
}

/**
 * Smooth scroll to element with navbar offset
 */
export function scrollToElementWithNavbarOffset(
  elementId: string,
  navbarHeight: number = 70,
  options: ScrollToOptions = {}
): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const offsetPosition = absoluteElementTop - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
    ...options
  });
}

/**
 * Get optimal navbar height based on scroll state
 */
export function getNavbarHeight(isScrolled: boolean): number {
  return isScrolled ? 44 : 56; // 11*4 = 44px when scrolled, 14*4 = 56px when not
}
