import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHOVERTable]'
})
export class HOVERTableDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('rgba(255, 165, 0, 0.1)'); // Apply hover effect on mouse enter (orange color)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null); // Remove hover effect on mouse leave
  }

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
