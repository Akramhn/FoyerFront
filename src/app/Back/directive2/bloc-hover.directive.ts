import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBlocHover]'
})
export class BlocHoverDirective   {

  @Input() appHoverInfo: any; // Input to receive data
  @Output() hoverData: EventEmitter<any> = new EventEmitter<any>(); // Output to emit data on hover

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    // Emit the data when mouse enters the element
    this.hoverData.emit(this.appHoverInfo);
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Clear the data when mouse leaves the element
    this.hoverData.emit(null);
  }
 
}
