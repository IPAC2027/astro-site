// Scroll animation utility for cards flying in from bottom
export class ScrollAnimations {
  private observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add('animate-in');
            element.classList.remove('animate-out');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }
  
  public observeElements(selector: string, staggerDelay: number = 100): void {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      
      // Add initial classes
      htmlElement.classList.add('animate-initial');
      
      // Add staggered delay for multiple cards
      htmlElement.style.setProperty('--animation-delay', `${index * staggerDelay}ms`);
      
      this.observer.observe(element);
    });
  }
  
  public disconnect(): void {
    this.observer.disconnect();
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const scrollAnimations = new ScrollAnimations();
  
  // Animate program cards
  scrollAnimations.observeElements('.program-card', 150);
  
  // Animate community stats
  scrollAnimations.observeElements('.community-stat', 100);
  
  // Animate other card elements
  scrollAnimations.observeElements('.animate-card', 120);
});