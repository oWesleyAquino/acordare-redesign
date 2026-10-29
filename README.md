# Acordare — Redesign UX/UI & Front-end

**Redesign conceitual de um site institucional de móveis e colchões**, com foco em uma experiência mais acolhedora, contemporânea e interativa.

[**Ver protótipo online**](https://acordare-redesign.vercel.app) · [Site original da Acordare](https://acordare.com.br/)

> **Projeto de portfólio / demonstração independente.** Esta implementação não substitui o site oficial da Acordare e não deve ser confundida com uma publicação institucional da empresa.

## Visão geral

A proposta foi reinterpretar a experiência digital da Acordare sem descaracterizar sua identidade. O trabalho preserva o logotipo, a paleta institucional e informações públicas da marca, enquanto reorganiza a navegação, o conteúdo e a apresentação dos ambientes.

A direção de design combina **fotografia editorial**, tipografia expressiva, fundos claros e grafite, formas moderadamente arredondadas e microinterações discretas. O laranja institucional `#FF6503` aparece como acento — em ícones, detalhes e estados de interação — e não como fundo dominante.

### Objetivos do estudo

- Fortalecer a percepção de conforto, tradição e qualidade da marca.
- Criar uma arquitetura de informação mais clara, com menos conteúdo acumulado na Home.
- Facilitar a descoberta de ambientes e a localização das lojas físicas.
- Desenvolver um protótipo responsivo e navegável para demonstração da experiência.

## Processo de UX/UI

| Etapa | Decisão de projeto |
| --- | --- |
| Diagnóstico | Revisão da hierarquia visual, da Home extensa e da apresentação sequencial das unidades. |
| Referências | Estudo de interfaces de interiores, mobiliário e sites institucionais, sem replicação direta de layouts. |
| Arquitetura | Separação entre Home, Ambientes e Nossa História, com acesso às lojas pelo mapa. |
| Identidade | Preservação de marca e cores; aprimoramento de contraste, ritmo editorial e espaçamento. |
| UI e movimento | Cards arredondados, hovers sutis, transições suaves e Hero com três mensagens/fotografias. |
| Implementação | Componentização em Next.js, navegação real, galeria filtrável e localização interativa. |

**Referências exploradas:** Moderno, Sitopia e Elysian (composições visuais fornecidas no briefing), além de [Glymax](https://www.glymax.com/), [Casa Boni](https://casaboni.com.br/), [Coprel Telecom](https://www.copreltelecom.com.br/quem-somos#abrangencia) e [Agência Jung](https://www.agenciajung.com.br/). São referências de princípios de composição, interação e organização — não templates reproduzidos.

## Funcionalidades implementadas

- **Home editorial:** Hero com três slides, textos sincronizados com as imagens e botões de ação consistentes.
- **Ambientes:** cards fotográficos e página de galeria com filtros por categoria.
- **Nossa História:** página com apresentação institucional, construída a partir de informações públicas.
- **Localizador de lojas:** mapa Leaflet/OpenStreetMap, seleção por cidade e cards com informações das unidades.
- **Navegação responsiva:** header, menu mobile, transições e caminhos entre páginas.
- **Microinterações:** animações de hover, estados visuais e mudanças de destaque nos componentes.

## Tecnologias

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **CSS personalizado** com variáveis e media queries
- **Lucide React** para iconografia
- **Leaflet** e **OpenStreetMap** para visualização do mapa
- **GitHub** para versionamento e **Vercel** para hospedagem

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial, diferenciais, ambientes, inspiração e mapa. |
| `/ambientes` | Galeria de ambientes com filtros. |
| `/nossa-historia` | Conteúdo institucional e trajetória da marca. |

## Executar localmente

Pré-requisito: Node.js compatível com Next.js 15.

```bash
git clone https://github.com/oWesleyAquino/acordare-redesign.git
cd acordare-redesign
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para conferir a compilação de produção:

```bash
npm run build
```

## Limites do protótipo

Este é um **protótipo demonstrativo**, não um e-commerce ou sistema de atendimento em produção.

- Não há checkout, autenticação, CMS ou backend comercial.
- Dados institucionais e endereços foram extraídos do site público e precisam ser confirmados pela empresa antes de uso operacional.
- Os pins do mapa representam **centros aproximados das cidades**, não a localização precisa das fachadas. Unidades na mesma cidade podem compartilhar a posição do pin.
- Parte das imagens é vinculada por URL ao site público da marca e há fotografia ilustrativa de apoio. Links externos podem mudar.
- Os CTAs e as informações das lojas demonstram a jornada proposta; não constituem garantia de atendimento ou disponibilidade de produtos.

## Próximos aprimoramentos possíveis

- Validar coordenadas, horários e contatos de cada loja.
- Hospedar e otimizar as imagens essenciais.
- Revisar acessibilidade e desempenho com auditorias automatizadas e testes manuais.
- Adicionar capturas reais do desktop e do mobile ao repositório.
- Conectar o fluxo de atendimento e um CMS, caso a proposta evolua para produção.

## Créditos e uso de marca

**Concepção de UX/UI e desenvolvimento front-end:** Wesley Aquino.

Acordare, seu logotipo, suas fotografias e demais ativos institucionais pertencem aos respectivos titulares. O projeto apresenta uma proposta independente de redesign para estudo e portfólio; não transfere direitos sobre esses materiais. Fotografias de terceiros permanecem sujeitas às respectivas licenças.

---

**[Explorar demonstração online](https://acordare-redesign.vercel.app)**

