import { Desconto } from '../desconto';
import { Orcamento } from '../orcamento';
import { AplicadorDeDesconto } from './aplicador-de-desconto';

export class AplicadorDeDescontoValorTotal extends AplicadorDeDesconto {
  private static VALOR_TOTAL_MINIMO = 10000;

  obterDesconto(orcamento: Orcamento): Desconto | null {
    if (orcamento.subTotal < AplicadorDeDescontoValorTotal.VALOR_TOTAL_MINIMO)
      return null;

    const valorDesconto = orcamento.subTotal * 0.1;
    return new Desconto(
      valorDesconto,
      'Desconto de 10% por valor total acima de R$ 100,00'
    );
  }
}
