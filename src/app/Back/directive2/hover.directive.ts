import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverStyles(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setHoverStyles(false);
  }

  private setHoverStyles(isHovered: boolean) {
    if (isHovered) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f0f0');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      // Add other styles as needed
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
      // Remove other styles as needed
    }
  }

}
