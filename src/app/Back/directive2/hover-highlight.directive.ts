// app-hover-highlight.directive.ts

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('gris');
    this.enlargeImage(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    this.enlargeImage(false);
  }

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  private enlargeImage(shouldEnlarge: boolean) {
    const imgElement = this.el.nativeElement.querySelector('img');

    if (shouldEnlarge) {
      this.renderer.setStyle(imgElement, 'transform', 'scale(1.2)');
      this.renderer.setStyle(imgElement, 'transition', 'transform 0.3s ease-in-out');
    } else {
      this.renderer.setStyle(imgElement, 'transform', 'scale(1)');
      this.renderer.removeStyle(imgElement, 'transition');
    }
  }
}
