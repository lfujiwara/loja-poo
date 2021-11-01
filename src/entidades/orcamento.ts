import { Produto } from './produto';
import { Desconto } from './desconto';
import { v4 } from 'uuid';

export class Orcamento {
  private _id: string;
  private _produtos: Produto[];
  private _subTotal: number;
  private _total: number;
  private _descontos: Desconto[];

  constructor(
    id: string,
    produtos: Produto[] = [],
    subTotal = 0,
    total = 0,
    descontos: Desconto[] = []
  ) {
    this._id = id;
    this._produtos = produtos;
    this._subTotal = subTotal;
    this._total = total;
    this._descontos = descontos;
  }

  static criar() {
    return new Orcamento(v4());
  }

  public get id(): string {
    return this._id;
  }

  public get subTotal(): number {
    return this._subTotal;
  }

  public get total(): number {
    return this._total;
  }

  public get produtos(): Produto[] {
    return this._produtos;
  }

  public get descontos(): Desconto[] {
    return this._descontos;
  }

  private calcularTotais() {
    this._subTotal = this._produtos.reduce(
      (acc, produto) => acc + produto.preco,
      0
    );
    this._total =
      this._subTotal -
      this._descontos.reduce((acc, desconto) => acc + desconto.valor, 0);
  }

  public adicionarDesconto(desconto: Desconto): void {
    this._descontos.push(desconto);
    this.calcularTotais();
  }

  public adicionarProduto(produto: Produto): void {
    this._produtos.push(produto);
    this.calcularTotais();
  }

  public removerProduto(produto: Produto): void {
    const index = this._produtos.indexOf(produto);
    this._produtos.splice(index, 1);
    this.calcularTotais();
  }

  private agruparProdutos(): { produto: Produto; quantidade: number }[] {
    const agrupamento: {
      [id: string]: { produto: Produto; quantidade: number };
    } = {};

    this.produtos.forEach((produto) => {
      if (!agrupamento[produto.id])
        agrupamento[produto.id] = { produto, quantidade: 0 };
      agrupamento[produto.id].quantidade++;
    });

    return Object.values(agrupamento).filter(
      (produtoQuantidade) => produtoQuantidade !== undefined
    );
  }

  public toString() {
    return [
      `Orçamento: ${this._id}`,
      '---',
      'PRODUTOS',
      ...this.agruparProdutos().map(
        ({ produto, quantidade }) =>
          `${produto.toString()} x ${quantidade} - R$ ${
            (produto.preco * quantidade) / 100
          }`
      ),
      '---',
      'DESCONTOS',
      ...this.descontos.map((desconto) => desconto.toString()),
      '---',
      `SUBTOTAL: R$ ${this._subTotal / 100}`,
      `TOTAL: R$ ${this._total / 100}`,
    ].join('\n');
  }
}
