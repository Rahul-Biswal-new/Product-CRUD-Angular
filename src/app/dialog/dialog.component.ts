import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent  implements OnInit {
  freshNessList= ["BrandNew", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private api: ApiService , private dialogref: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName : ['', Validators.required],
      category: ['', Validators.required],
      freshNess: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
  }


  addProducts(){
    console.log(this.productForm.value);
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res)=>{alert("product added successfully")
        this.productForm.reset()
        this.dialogref.close('save')
      },
        error: (err)=>{alert("error adding product")}
      })
    }
  }

  getProduct(){
    
  }
}
