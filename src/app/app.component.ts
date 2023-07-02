import { Component , OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'product-crud-angular';

  constructor(public dialog: MatDialog, private api: ApiService) { }


  ngOnInit(): void {
    this.getProduct()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      // data: {
      //   animal: 'panda',
      // },
      width: '30%',
    });
  }

  getProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        alert("error loading data");
      },
    });
  }
}
