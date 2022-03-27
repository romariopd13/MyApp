import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/shared/services/Client.service';

@Component({
  selector: 'app-formulario-client',
  templateUrl: './formulario-client.component.html',
  styleUrls: ['./formulario-client.component.css']
})
export class FormularioClientComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormularioClientComponent>,
    private formBuilder: FormBuilder,
    private clientService: ClienteService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: this.data.id ? this.data.id : '',
      nome: [this.data.nome ? this.data.nome : '', Validators.required],
      cpf: [this.data.cpf ? this.data.cpf : '', Validators.required],
      inadimplente: [this.data.inadimplente ? this.data.inadimplente : false],
    })
  }
  salvarClient(dados: any) {
    this.clientService.save(dados).subscribe(res => {
      this.dialogRef.close("Cadastrado");
      this.openSnackBar("Salvo com sucesso", "Ok")
    })
  }
  atualizarClient(dados: any) {
    this.clientService.update(dados.id, dados).subscribe(res => {
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
      this.salvarClient(form.value)
    } else {
      this.atualizarClient(form.value)
    }

  }
}
