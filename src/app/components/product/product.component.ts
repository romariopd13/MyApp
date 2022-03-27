import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data: any[] = []
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.productService.getAll().subscribe(res => {
      this.data = res;
    })
  }
  openDialogFormularioProduct(item?) {
    this.dialog.open(FormularioComponent, {
      data: item ? item : ''
    }).afterClosed()
      .subscribe((res) => {
        if (res) {
          this.getAll()
        }
      });
  }
  destroy(product: any) {
    let index = this.data.indexOf(product);
    this.productService.destroy(product.id).subscribe(() => {
      this.data.splice(index, 1);
      this.openSnackBar("Poof! Deletado com sucesso!", "Ok");
    })

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
