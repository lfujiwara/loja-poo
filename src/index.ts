import { AplicadorDeDescontoGeral } from './entidades/descontos/aplicador-de-desconto-geral';
import { AplicadorDeDescontoQuantidadeDeProdutos } from './entidades/descontos/aplicador-de-desconto-quantidade-de-produtos';
import { AplicadorDeDescontoValorTotal } from './entidades/descontos/aplicador-de-desconto-valor-total';
import { Orcamento } from './entidades/orcamento';
import { Produto } from './entidades/produto';

const foneDeOuvido = Produto.criar('Fone de ouvido', 500 * 100);
const teclado = Produto.criar('Teclado', 300 * 100);

const descontosDisponiveis = [
  new AplicadorDeDescontoQuantidadeDeProdutos(),
  new AplicadorDeDescontoValorTotal(),
];

const aplicadorGeral = new AplicadorDeDescontoGeral(descontosDisponiveis);

const orcamento = Orcamento.criar();
orcamento.adicionarProduto(foneDeOuvido);
orcamento.adicionarProduto(teclado);

aplicadorGeral.aplicar(orcamento);

console.log(orcamento.toString());
