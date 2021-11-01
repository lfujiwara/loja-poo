import { v4 } from 'uuid';

export class Produto {
  private _id: string;
  private _nome: string;
  private _preco: number;

  constructor(id: string, nome: string, preco: number) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
  }

  static criar(nome: string, preco: number) {
    return new Produto(v4(), nome, preco);
  }

  public get id(): string {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get preco(): number {
    return this._preco;
  }

  public set preco(preco: number) {
    if (!Number.isSafeInteger(preco))
      throw new Error('Preço inválido (não é inteiro seguro)');
    if (preco <= 0) throw new Error('Preço inválido (não é positivo)');
    this._preco = preco;
  }

  public toString() {
    return `Produto: ${this.nome} - R$ ${this.preco / 100}\nID ${this.id}`;
  }
}
