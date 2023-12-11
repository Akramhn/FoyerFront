import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { EtudiantService } from '../../service/etudiant.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserRole } from 'src/app/Model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  students: any[] = [];
  foundUsers: any[] = [];
  foundAdmin:any[] = [];
  searchTerm: string = '';
  searchTermAdmin: string = '';
  pageSize: number = 5;
  currentPage: number = 0;
  totalStudents: number = 0;
  totalPages: number[] = [];
  admins: any[] = [];
  totalEntries = 0;
  constructor(private userService: EtudiantService) {}
  
  ngOnInit(): void {
    this.loadUsers();
    this.loadAdmin();
  }
 
  loadAdmin(): void {
    this.userService.getAllAdmin(this.currentPage, this.pageSize, UserRole.ADMIN)
      .subscribe(
        (data: any) => {
          if (data && Array.isArray(data.content)) {
            this.foundAdmin = data.content;
            console.log(data.content)
            this.totalEntries = data.totalElements;
            console.log(data.totalElements)
            this.calculateTotalPages();
            this.applySearchFilterStudent();
          } else {
            console.error('Invalid API response structure:', data);
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }
  loadUsers(): void {
    this.userService.getAllEtudiantsRole(this.currentPage, this.pageSize, UserRole.ETUDIANT)
      .subscribe(
        (data: any) => {
          if (data && Array.isArray(data.content)) {
            this.students = data.content;
            console.log(data.content)
            this.totalEntries = data.totalElements;
            console.log(data.totalElements)
            this.calculateTotalPages();
            this.applySearchFilter();
          } else {
            console.error('Invalid API response structure:', data);
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  calculateTotalPages(): void {
    this.totalPages = Array(Math.ceil(this.totalEntries / this.pageSize)).fill(0).map((x, i) => i);
  }
  onPageChange(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber < this.totalPages.length) {
      this.currentPage = pageNumber;
      this.loadUsers();
    }
  }  
  onSearchAdmin(): void {
    this.currentPage = 0; // Reset to the first page when searching
    this.loadAdmin();
  }


  onSearch(): void {
    this.currentPage = 0; // Reset to the first page when searching
    this.loadUsers(); // Reload data to apply search filter
    
  }

  applySearchFilterStudent(): void {
    if (this.searchTermAdmin.trim() === '') {
      // Show all users if search term is empty
      this.foundAdmin = this.foundAdmin;
    } else {
      this.foundAdmin = this.foundAdmin.filter(user =>
        user.email.toLowerCase().includes(this.searchTermAdmin.toLowerCase())
      );
    }
  }
  applySearchFilter(): void {
    if (this.searchTerm.trim() === '') {
      // Show all users if search term is empty
      this.students = this.students;
    } else {
      this.students = this.students.filter(user =>
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'http://localhost:9090', // Set your backend URL
  //     // Other headers if needed
  //   })
  // };

  deleteUser(userId: number): void {
    this.userService.deleteEtudiant(userId).subscribe(
      () => {
        console.log('User deleted successfully.');
        this.loadUsers();
        this.loadAdmin();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
