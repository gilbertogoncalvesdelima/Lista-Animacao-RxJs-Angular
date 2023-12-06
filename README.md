# Figma

[Figma](https://www.figma.com/file/Bhn16SZasA5InHtw4CgNlv/Angular---Anima%C3%A7%C3%B5es--Gilberto-Gon%C3%A7alves?type=design&node-id=304-517&mode=design&t=bEkjdtHy0VH071y0-0)

## Site para criar suas proprias curvas, cubic-bezier.com

Ela é formada por 4 pontos de controle, aonde você pode modificar a curva, pode adicionar a duração também, quando clica em gol, você consegue ver a animação como ira ficar, você pode personalizar como começa e termina

[Cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67)

Existem várias ferramentas online disponíveis para ajudar a criar e visualizar curvas personalizadas cubic-bezier, como o site cubic-bezier.com, que permite criar e visualizar curvas personalizadas cubic-bezier.

A [Documentação oficial do MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#using_the_cubic-bezier_function) do MDN também traz informações interessantes sobre essa ferramenta.

E o [easings net](https://easings.net/) fornece uma galeria de curvas de animação pré-definidas e permite que você crie suas próprias curvas personalizadas.

## Group()

Group é um método disponível no módulo de animações (@angular/animations). Ele é usado para agrupar várias animações para serem executadas simultaneamente. O método group aceita um array de animações e as executa de forma concorrente.

## Query()

query() é uma função fornecida pelo módulo de animações (@angular/animations) que permite selecionar elementos do DOM e aplicar animações a eles dentro de um contexto específico. A função query() é frequentemente usada em conjunto com outros métodos de animação, como animate(), style(), e stagger()

## keyframes()

keyframes() é uma função fornecida pelo módulo de animações (@angular/animations) para definir animações mais complexas usando quadros-chave CSS. Essa função é usada em conjunto com o método animate() para criar animações com diferentes estágios ou momentos-chave.

A função keyframes() aceita um array de objetos de quadro-chave, onde cada objeto representa o estilo em um determinado ponto no tempo da animação.

## Stagger()

é uma função fornecida pelo módulo de animações (@angular/animations). Essa função é usada para adicionar um atraso (stagger) entre as animações aplicadas a elementos selecionados. Ela é frequentemente utilizada dentro da função query() para criar efeitos de animação mais dinâmicos e visualmente atraentes.

## Conclusão

Foi criado animações para validar os campos de um formulário, além de como animar a entrada e saída dos cards, a busca e também o carregamento inicial da lista. Para isso, conhecemos o métodos como o group(), query(), stagger(), keyframes() e cubic-bezier().
