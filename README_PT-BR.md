# Material Design Lite

[![Versão GitHub](https://badge.fury.io/gh/google%2Fmaterial-design-lite.svg)](https://badge.fury.io/gh/google%2Fmaterial-design-lite) [![Versão npm](https://badge.fury.io/js/material-design-lite.svg)](https://badge.fury.io/js/material-design-lite) [![Versão Bower](https://badge.fury.io/bo/material-design-lite.svg)](https://badge.fury.io/bo/material-design-lite)

> Uma implementação de componentes [Material Design](http://www.google.com/design/spec/material-design/introduction.html) em CSS, JS, e HTML.

Material Design Lite (MDL) permite que você adicione Material Design em seus sites de conteúdo estático. Ele não depende de quaisquer estruturas JavaScript ou bibliotecas. Otimizado para uso cross-device, funciona perfeitamente em browser mais velhos.

## Usar MDL no seu site?

**Este documento é destinado a desenvolvedores que irão contribuir ou compilar o MDL. Se você estiver querendo usar o MDL em seu site ou aplicativo da web, por favor dirigir-se ao
[getmdl.io](http://getmdl.io).**

## Browsers Suportados

| IE9 | IE10 | IE11 | Chrome | Opera | Firefox | Safari | Chrome (Android) | Mobile Safari |
|-----|------|------|--------|-------|---------|--------|------------------|---------------|
| B   | A    | A    | A      | A     | A       | A      | A                | A             |

A-Totalmente suportado. B-Pode sofrer pequenas alteraçõs apenas no CSS.

## Começando...

### Download / Clone

Clone o repositório usando Git:

```bash
git clone https://github.com/google/material-design-lite.git
```

Você também pode fazer o [download](https://github.com/google/material-design-lite/archive/master.zip) desse repositório.

Usuários do Windows, se  tiver problemas para compilar devido aos finais de linha, certifique-se de configurar o git para fazer o checkout do repositório com `lf`. isto pode ser feito através da criação do `core.eol`.

```
git config core.eol lf
git config core.autocrlf input
git rm --cached -r .
git reset --hard
```

> Lembre-se, o branch master é considerado instável. Não use este em Produção. Use um estado com etiquetas do repositório, npm, ou bower para a uma versão estável!

### O que está incluso

No repositório você encontrará os seguintos diretórios e arquivos.

| Arquivo/Pasta   | Fornecimento                                   |
|-----------------|------------------------------------------------|
| CONTRIBUTING.md | Orientações de contribuição no MDL.            |
| docs            | Arquivos para o site de documentação.          |
| gulpfile.js     | Configuração gulp para o MDL.                  |
| LICENSE         | Informaçãoes de licença do projeto.            |
| package.json    | Informação dos pacotes npm.                    |
| README.md       | Detalhes para entender rapidamente o projeto.  |
| src             | O código fonte para os componentes do MDL.     |
| templates       | Templates de exemplos.                         |
| test            | Arquivos de testes do projeto.                 |

### Build

Para começar a modificar os componentes ou os documentos, instale primeiro as dependências necessárias, a partir da raiz do projeto:

```bash
npm install && npm install -g gulp
```

> MDL requer NodeJS 0.12.

Em seguida, execute a linha a seguir para compilar os componentes e os documentos e gerar uma instância local do site de documentação:

```bash
gulp all && gulp serve
```

A maioria das alterações feitas nos arquivos dentro do `src` ou no diretório `docs` precisará que  a página seja recarregada. Esta página também pode ser carregado em dispositivos físicos graças ao BrowserSync.

Para construir uma versão de produção dos componentes, executar:

```bash
gulp
```

Isso irá limpar a pasta `dist` e reconstruir os arquivos.

### Templates

O sub-diretório `templates/` contém alguns exemplois que usam o MDL. Cada template possui suas próprias configurações e podem ser compilado com: `gulp templates`. Os templates usam JS e Arquivos CSS [personalizados](http://www.getmdl.io/customize/index.html). Estilos específicos são mantidos em um arquivo separado. Use `gulp serve` para ver os templates:

* [Blog Template](http://www.getmdl.io/templates/blog)
* [Dashboard Template](http://www.getmdl.io/templates/dashboard)
* [Text Heavy Webpage Template](http://www.getmdl.io/templates/text-only)
* [Stand Alone Article Template](http://www.getmdl.io/templates/article)
* [Android.com MDL Skin Template](http://www.getmdl.io/templates/android-dot-com)

>Os templates podem não funcionar corretamente no IE9 e browsers antigos que não possuam os requesitos mínimos definidos em nossos [testes](https://github.com/google/material-design-lite/blob/87c48c22416c3e83850f7711365b2a43ba19c5ce/src/mdlComponentHandler.js#L336-L349).


>Cuidado como quaisquer alteração no diretório `templates`, isso  reverterá automaticamente os modelos de substituições de testes locais. Neste caso, certifique-se de executar o `templates:localtestingoverride` novamente ou modificar a função `watch()` no arquivo gulp.

## Versionamento

Para fins de transparência em nosso ciclo de lançamento e na tentativa de manter tudo compatível, o MDL é mantido sob [as diretrizes de controle de versão](http://semver.org/). As vezes podemos entregar tudo, mas sempre que possível vamos atendar a essas regras.

## Solicitação de Recursos

Se você achar que o MDL não contém um componente que você acha que seria útil, por favor, verifique nas `issues` se ele já está em desenvolvimento. Se não, você pode solicitar um [novo componente](https://github.com/Google/material-design-lite/issues/new?title=[Component%20Request]%20{Component}&body=Please%20include:%0A*%20Description%0A*%20Material%20Design%20Spec%20link%0A*%20Use%20Case%28s%29).
Por favor, tenha em mente que um dos objetivos do MDL é a aderir as especificações do material  design e, portanto, algumas solicitações pode não ser no âmbito deste projeto.

## Quer contribuir?

Se você encontrou um bug, tiver dúvidas ou quiser contribuir. Siga as nossas
[orientações](https://github.com/google/material-design-lite/blob/master/CONTRIBUTING.md), e ajude e melhorar o Material Design Lite. Para mais informação visite nossa
[wiki](https://github.com/google/material-design-lite/wiki).

## Você inclue todos os recursos que vem com um framework?

Material Design Lite está focada em fornecer uma biblioteca de componentes CSS/JS/HTML. Nós não somos um framework. Se você está construindo uma aplicação de uma única página e exigem recursos como de duas vias de ligação de dados, modelagem, escopo CSS e assim por diante, nós recomendamos experimentar o excelente projeto: [Polymer](http://polymer-project.org)


## Licença

© Google, 2015. Licenciado sob a licença
[Apache-2](https://github.com/google/material-design-lite/blob/master/LICENSE)
