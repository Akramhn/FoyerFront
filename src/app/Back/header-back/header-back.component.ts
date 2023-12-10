import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css' , '../../../assets/css/styleback.css']
})
export class HeaderBackComponent implements OnInit {
 
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(private renderer: Renderer2, private el: ElementRef,private router:Router) { }
  private isSidebarOpen = false;

  ngOnInit() {
    const toggleSidebarBtn = this.el.nativeElement.querySelector('.toggle-sidebar-btn');

    this.renderer.listen(toggleSidebarBtn, 'click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;

      if (this.isSidebarOpen) {
        this.renderer.addClass(document.body, 'toggle-sidebar');
      } else {
        this.renderer.removeClass(document.body, 'toggle-sidebar');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    
  }
  getUserID() {
   
    this.userconnect.id;
  }
}
