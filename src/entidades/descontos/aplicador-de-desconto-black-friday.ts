import { Desconto } from '../desconto';
import { Orcamento } from '../orcamento';
import { AplicadorDeDesconto } from './aplicador-de-desconto';

export class AplicadorDeDescontoBlackFriday extends AplicadorDeDesconto {
  obterDesconto(orcamento: Orcamento) {
    if (this.blackFriday()) return null;

    const desconto = new Desconto(orcamento.subTotal * 0.2, 'Black Friday');

    return desconto;
  }

  blackFriday() {
    const data = new Date();
    const dia = data.getDay();
    const mes = data.getMonth();

    return dia >= 28 && mes === 11;
  }
}
