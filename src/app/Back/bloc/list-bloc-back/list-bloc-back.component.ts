import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from '../../service/bloc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddBlocBackComponent } from '../add-bloc-back/add-bloc-back.component';
import { ModifBlocBackComponent } from '../modif-bloc-back/modif-bloc-back.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import * as XLSX from 'xlsx';
import * as jspdfImport from 'jspdf';

@Component({
  selector: 'app-list-bloc-back',
  templateUrl: './list-bloc-back.component.html',
  styleUrls: ['./list-bloc-back.component.css']
})
export class ListBlocBackComponent implements AfterViewInit {
  list: Bloc[] = [];
  searchTerm: string = '';
  exportType: string = '';
  originalList: Bloc[] = [];
  @ViewChild('content') content!: ElementRef;

  constructor(
    private blocS: BlocService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    // Call exportData or any other method after the view has been initialized
    this.exportData();
  }
  ngOnInit(): void {
    this.loadBlocs();
  }

  loadBlocs(): void {
    this.blocS.getBlocs().subscribe((data) => {
      this.list = data;
      this.originalList = data; // Initialize the original list
      console.log(data);
    });
  }

  exportData(): void {
    if (this.exportType === 'excel') {
      this.exportAsExcel();
    } else if (this.exportType === 'pdf') {
      this.exportAsPDF();
    } else {
      console.log('Invalid export type');
    }
  }

  private exportAsExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save to file
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }

  private exportAsPDF(): void {
    if (this.content && this.content.nativeElement) {
      const jsPDF = jspdfImport.jsPDF;
      const doc = new jsPDF();
      const content = this.content.nativeElement;
      doc.html(content.innerHTML, {
        callback: (pdf) => {
          pdf.save('exported_data.pdf');
        }
      });
    } else {
      console.error('Content not available for PDF export');
    }
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // If search term is empty, reset the list to the original list
      this.list = this.originalList;
    } else {
      // If search term is not empty, filter the list
      this.list = this.originalList.filter((item) =>
        item.nomBloc.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
  openAddEditBlocForm(): void {
    const dialogRef = this._dialog.open(AddBlocBackComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadBlocs();
      }
    });
  }

  onDelete(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (isConfirmed) {
      this.blocS.deleteBloc(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');
        this.loadBlocs();
        setTimeout(() => {}, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }

  openUpdate(data: any): void {
    const dialogRef = this._dialog.open(ModifBlocBackComponent, { data });

    dialogRef.componentInstance.blocUpdated.subscribe(() => {
      this.loadBlocs();
    });
  }
  
}
