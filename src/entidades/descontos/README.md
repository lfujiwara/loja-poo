# Módulo de descontos

Situação: A partir de um orçamento, queremos aplicar todos os decontos elegíveis a esse orçamento.

### Solução 1 - Função/Método

Podemos ter uma função que utiliza vários `if`s para fazer a verificação:

```typescript
function aplicarDescontos(orcamento: Orcamento) {
  if (...) {
    orcamento.adicionarDesconto(1000, 'Desconto 1')
  }
  if (...) {
    orcamento.adicionarDesconto(3000, 'Desconto 2')
  }
}
```

Problemas da solução inicial:

- Precisamos alterar o comportamento da função (potencialmente a própria classe, se a função for um método dela) sempre que quisermos incluir ou remover um novo desconto, adicionar ou remover ifs.
- Estamos misturando a lógica de vários tipos de descontos no mesmo lugar, a função papéis múltiplos, violando o Single Responsibility Principle.

### Solução 2 - Classes abstratas/Interfaces e Tell, don't ask

Partindo de uma classe abstrata (ou interface), podemos utilizar uma subclasse para cada tipo de desconto:

```typescript
abstract class AplicadorDeDesconto {
  aplicar(orcamento: Orcamento): void;
}

class AplicadorDeDescontoNumeroDeItens extends AplicadorDeDescontos {
  aplicar(orcamento) {
    if (orcamento.produtos.length > 5)
      orcamento.adicionarDesconto(
        1000,
        'Desconto pelo número de itens maior do que 5'
      );
  }
}

function aplicarDescontos(orcamento: Orcamento) {
  const descontoNumeroDeItens = new AplicadorDeDescontoNumeroDeItens();
  descontoNumeroDeItens.aplicar(orcamento);
}
```

Dessa forma, podemos evitar os `if`s na função anterior, basta chamar o aplicador de desconto. A lógica de verifição da elegibilidade do desconto também ficou isolada e clara. Recomendo a leitura sobre o princípio [Tell, don't ask](https://martinfowler.com/bliki/TellDontAsk.html).

### Solução 3 - Encadeamento

Para deixar a solução mais elegante, podemos tratar os aplicadores de desconto como uma lista ligada: Cada aplicador é um nó da lista, que pode apontar para o próximo aplicador, ou para `null` (fim da lista).

```typescript
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
```

Note que o a função `encadear` se assemelha ao padrão [builder](https://refactoring.guru/design-patterns/builder). Dessa maneira, podemos encadear os aplicadores de forma flexível

```typescript
class FabricaDeAplicadores {
  fabricar() {
    const aplicador = new AplicadorDeDesconto1()
      .encadear(new AplicadorDeDesconto2())
      .encadear(new AplicadorDeDesconto3());
  }
}
```

Para adicionar um novo aplicador de desconto, basta adicionar um `.encadear`.

## Solução 4 - Fábrica e inversão de dependência

Para polir ainda mais o código, podemos criar um aplicador de desconto que recebe outros aplicadores como dependência, e chama todos eles por encadeamento:

```typescript
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
```

Elementos funcionais como `Array.reduce` vêm a calhar aqui. :)

Então, podemos criar uma fábrica para esse aplicador de desconto geral, onde podemos concentrar todas as chamadas aos construtores:

```typescript
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
```
