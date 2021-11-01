import { AplicadorDeDesconto } from './aplicador-de-desconto';
import { AplicadorDeDescontoBlackFriday } from './aplicador-de-desconto-black-friday';
import { AplicadorDeDescontoGeral } from './aplicador-de-desconto-geral';
import { AplicadorDeDescontoQuantidadeDeProdutos } from './aplicador-de-desconto-quantidade-de-produtos';
import { AplicadorDeDescontoValorTotal } from './aplicador-de-desconto-valor-total';

export class FabricaAplicadorDeDescontoGeral {
  public fabricar(): AplicadorDeDesconto {
    const aplicadores = [
      AplicadorDeDescontoValorTotal,
      AplicadorDeDescontoQuantidadeDeProdutos,
      AplicadorDeDescontoBlackFriday,
    ].map((Aplicador) => new Aplicador());

    return new AplicadorDeDescontoGeral(aplicadores);
  }
}
