import { Desconto } from '../desconto';
import { Orcamento } from '../orcamento';

export abstract class AplicadorDeDesconto {
  constructor(protected proximoAplicador?: AplicadorDeDesconto) {}

  aplicar(orcamento: Orcamento): void {
    const desconto = this.obterDesconto(orcamento);
    if (desconto !== null) orcamento.adicionarDesconto(desconto);

    this.aplicarProximoOuSair(orcamento);
  }

  encadear(proximoAplicador: AplicadorDeDesconto): AplicadorDeDesconto {
    this.proximoAplicador = proximoAplicador;
    return proximoAplicador;
  }

  abstract obterDesconto(orcamento: Orcamento): Desconto | null;

  private aplicarProximoOuSair(orcamento: Orcamento) {
    if (this.proximoAplicador) this.proximoAplicador.aplicar(orcamento);
  }
}
