import { Component , OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'product-crud-angular';
  displayedColumns: string[] = ['productName', 'category', 'date','freshness','price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }


  ngOnInit(): void {
    this.getProduct()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getProduct();
      }
    });
  }

  getProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource =  new  MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =  this.sort;
        console.log(this.dataSource);
        console.log(this.dataSource.paginator);
        console.log(this.dataSource.sort);

      },
      error: (err) => {
        console.log(err);
        alert("error loading data");
      },
    });
  }


  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getProduct();
      }
    })
  }


  deleteProduct(id: number){
    this.api.deleteProduct(id).subscribe({
      next: (res)=>{
        alert("product deleted");
        this.getProduct();
      },
      error: (err)=>{
        alert('error deleting product')
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
