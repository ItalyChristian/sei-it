## Decisões técnicas

### 1. Escolha da solução de estilização com **[Vanilla Extract](https://vanilla-extract.style/)**

Os principais motivos:

- **Zero-runtime:** os estilos são gerados durante o build, sem necessidade de executar uma biblioteca de CSS-in-JS em runtime.
- **Compatibilidade com Server Components:** permite estilizar componentes sem introduzir uma dependência de Client Components ou adicionar `'use client'` exclusivamente por causa da estilização.
- **TypeScript:** oferece tipagem estática para estilos, temas, variáveis e composição.
- **Organização e escalabilidade:** facilita a criação de tokens, temas, variantes e estilos reutilizáveis, mantendo uma boa separação de responsabilidades.

CSS Modules também seria uma alternativa válida, especialmente pela simplicidade e proximidade com o CSS tradicional. Entretanto, Vanilla Extract oferece recursos adicionais de tipagem e composição que favorecem a organização de uma arquitetura de estilos mais escalável.

### 2. Escolha do bundler: Webpack em vez de Turbopack

Embora o Next.js 16 utilize Turbopack por padrão, optei por manter **Webpack** neste projeto.

A integração do Vanilla Extract com Turbopack ainda é identificada como experimental em sua documentação oficial, enquanto a integração tradicional com Webpack já possui suporte estabelecido.

Considerando o requisito de priorizar tecnologias estáveis, previsibilidade e manutenção de longo prazo, optamos por não introduzir uma integração experimental apenas para utilizar o bundler padrão do Next.js.

Essa decisão também evita dependências de APIs instáveis e mantém a configuração alinhada à integração oficialmente documentada do Vanilla Extract.

Referência: [Vanilla Extract — Next.js Integration](https://vanilla-extract.style/documentation/integrations/next/)
