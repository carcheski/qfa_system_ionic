import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) { 
    this.route.queryParams
      .subscribe(params => {
        this.pedido = params.pedido;
      }),
      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        '@type': ["pagamentoComCartao", Validators.required]
      });
  }

  ngOnInit() {
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }

}
