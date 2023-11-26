import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css' , '../../../assets/css/styleback.css']
})
export class HeaderBackComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  private isSidebarOpen = false;

  ngOnInit() {
    // Get the button element by class name
    const toggleSidebarBtn = this.el.nativeElement.querySelector('.toggle-sidebar-btn');

    // Add click event listener
    this.renderer.listen(toggleSidebarBtn, 'click', () => {
      // Toggle the 'toggle-sidebar' class on the body element
      this.isSidebarOpen = !this.isSidebarOpen;

      if (this.isSidebarOpen) {
        this.renderer.addClass(document.body, 'toggle-sidebar');
      } else {
        this.renderer.removeClass(document.body, 'toggle-sidebar');
      }
    });
  }
}
