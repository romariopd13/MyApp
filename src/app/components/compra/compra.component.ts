import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/services/Client.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  cliente: any = []
  alert: boolean = false;
  products: any[] = []
  constructor(
    private clientesService: ClienteService,
    private prodctsService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  verificarCpf(cpf) {
    if (cpf) {
      this.clientesService.buscaClientePorCPF(cpf).subscribe(res => {
        this.alert = true
        this.cliente = res;
      })
    }
  }
  getAllProducts() {
    this.prodctsService.getAll().subscribe(res => {
      res.forEach(element => {
        element.subtotal = 0
        element.quantidade = 0
      });
      this.products = res
    })
  }
  calcularTotalProduto(item) {
    item.subtotal = item.quantidade * item.valor
  }
}
