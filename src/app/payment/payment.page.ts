import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;
  pagamento: PagamentoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    //this.pedido = this.pedidoService.getPedido();
    this.pedido = this.router.getCurrentNavigation()?.extras.state as PedidoDTO;
      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required]
      });
  }

  ngOnInit() {
    
    console.log(this.pedido);
  }

  nextPage() {
    console.log(this.pedido.pagamento);
    this.pedido.pagamento = this.formGroup.value;
    const params : NavigationExtras = {
      state: this.pedido
    };
    this.router.navigate(['/order-confirmation'], params);
  }

}
