import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormularioComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: this.data.id ? this.data.id : '',
      descricao: [this.data.descricao ? this.data.descricao : '', Validators.required],
      valor: [this.data.valor ? this.data.valor : '', Validators.required],
    })
  }
  salvarProduct(dados: any) {
    this.productService.save(dados).subscribe(res => {
      this.dialogRef.close("Cadastrado");
      this.openSnackBar("Salvo com sucesso", "Ok")
    })
  }
  atualizarProduct(dados: any) {
    this.productService.update(dados.id, dados).subscribe(res => {
      this.dialogRef.close("Alterado");
      this.openSnackBar("Alterado com sucesso", "Ok")
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  submit(form) {
    if (!form.value.id) {
      this.salvarProduct(form.value)
    } else {
      this.atualizarProduct(form.value)
    }

  }
}
