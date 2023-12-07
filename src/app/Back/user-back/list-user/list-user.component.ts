import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { EtudiantService } from '../../service/etudiant.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  students: any[] = [];
  foundUsers: any[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 0;
  totalStudents: number = 0;
  totalPages: number[] = [];

  totalEntries = 0;
  constructor(private userService: EtudiantService) {}
  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(pageNumber: number): void {
    this.userService.getUsers(pageNumber, this.pageSize).subscribe(
      (data: any) => {
        if (data && Array.isArray(data.content)) {
          this.students = data.content;
          this.totalEntries = data.totalElements;
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
      this.loadUsers(this.currentPage);
    }
  }

  onSearch(): void {
    this.currentPage = 0; // Reset to the first page when searching
    this.loadUsers(this.currentPage); // Reload data to apply search filter
  }

  applySearchFilter(): void {
    if (this.searchTerm.trim() === '') {
      this.foundUsers = [...this.students]; // Show all users if search term is empty
    } else {
      this.foundUsers = this.students.filter(user =>
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8089', // Set your backend URL
      // Other headers if needed
    })
  };

  deleteUser(userId: number): void {
    this.userService.deleteEtudiant(userId, this.httpOptions).subscribe(
      () => {
        console.log('User deleted successfully.');
        this.loadUsers(this.currentPage);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
