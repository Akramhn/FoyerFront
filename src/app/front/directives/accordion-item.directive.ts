import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAccordionItem]'
})
export class AccordionItemDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const isOpen = this.el.nativeElement.classList.contains('accordion-open');
    const openItem = document.querySelector('.accordion-open');

    if (isOpen) {
      this.closeItem();
    } else {
      this.toggleItem();

      if (openItem && openItem !== this.el.nativeElement) {
        this.closeItem(openItem);
      }
    }
  }

  private toggleItem() {
    const accordionContent = this.el.nativeElement.querySelector('.value__accordion-content');

    if (this.el.nativeElement.classList.contains('accordion-open')) {
      accordionContent.removeAttribute('style');
      this.renderer.removeClass(this.el.nativeElement, 'accordion-open');
    } else {
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
      this.renderer.addClass(this.el.nativeElement, 'accordion-open');
    }
  }

  private closeItem(item?: any) {
    const accordionContent = this.el.nativeElement.querySelector('.value__accordion-content');

    if (this.el.nativeElement.classList.contains('accordion-close')) {
      accordionContent.removeAttribute('style');
      this.renderer.removeClass(this.el.nativeElement, 'accordion-close');
    } else {
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
      this.renderer.addClass(this.el.nativeElement, 'accordion-close');
    }
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverStyles(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setHoverStyles(false);
  }

  private setHoverStyles(isHovered: boolean) {
    if (isHovered) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ed1515');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      // Add other styles as needed
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
      // Remove other styles as needed
    }
  }
}
