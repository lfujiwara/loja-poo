export class Desconto {
  constructor(public valor: number, public tipo: string) {}

  public toString() {
    return `Desconto: R$ ${this.valor / 100} por ${this.tipo}`;
  }
}
