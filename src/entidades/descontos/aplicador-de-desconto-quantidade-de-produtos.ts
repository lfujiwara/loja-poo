import { Desconto } from '../desconto';
import { Orcamento } from '../orcamento';
import { AplicadorDeDesconto } from './aplicador-de-desconto';

export class AplicadorDeDescontoQuantidadeDeProdutos extends AplicadorDeDesconto {
  private static QUANTIDADE_MINIMA_DE_PRODUTOS = 5;

  obterDesconto(orcamento: Orcamento) {
    if (
      orcamento.produtos.length <
      AplicadorDeDescontoQuantidadeDeProdutos.QUANTIDADE_MINIMA_DE_PRODUTOS
    )
      return null;

    const valorDesconto = orcamento.subTotal * 0.05;
    const desconto = new Desconto(
      valorDesconto,
      `Desconto de 5% pela quantidade de produtos (${AplicadorDeDescontoQuantidadeDeProdutos.QUANTIDADE_MINIMA_DE_PRODUTOS})`
    );

    return desconto;
  }
}
