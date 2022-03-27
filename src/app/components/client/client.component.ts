import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormularioClientComponent } from 'src/app/client/formulario-client/formulario-client.component';
import { ClienteService } from 'src/app/shared/services/Client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  data: any[] = []
  constructor(
    private clientService: ClienteService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.clientService.getAll().subscribe(res => {
      this.data = res;
    })
  }
  openDialogFormularioProduct(item?) {
    this.dialog.open(FormularioClientComponent, {
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
    this.clientService.destroy(product.id).subscribe(() => {
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
