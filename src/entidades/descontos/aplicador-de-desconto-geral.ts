import { Desconto } from '../desconto';
import { AplicadorDeDesconto } from './aplicador-de-desconto';

export class AplicadorDeDescontoGeral extends AplicadorDeDesconto {
  constructor(aplicadores: AplicadorDeDesconto[]) {
    super(
      aplicadores.reduce((encadeados, proximo) => encadeados.encadear(proximo))
    );
  }

  obterDesconto(): Desconto | null {
    return null;
  }
}
