import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent  implements OnInit {
  freshNessList= ["BrandNew", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  actionButton: string = "save";  
  constructor(private formbuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService , private dialogref: MatDialogRef<DialogComponent>
    ) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName : ['', Validators.required],
      category: ['', Validators.required],
      freshNess: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
    if(this.editData){
      this.actionButton = "Update"; 
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshNess'].setValue(this.editData.freshNess);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }


  addProducts(){
    console.log(this.productForm.value);
    if(!this.editData){
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
    else{
      this.updateProduct()
    }
  }


  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res)=>{
        alert("Product updated");
        this.productForm.reset();
        this.dialogref.close('update');
      },
      error: (err)=>{
        alert("error in update");
      }
    })
  }
  getProduct(){

  }
}
