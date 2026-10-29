# Diretriz de Projetos — Portfólio UX/UI & Desenvolvimento Web

Este documento registra o processo aplicado ao **redesign conceitual da Acordare** e serve como modelo para futuros cases de site institucional, landing page, e-commerce demonstrativo ou aplicativo. O README de cada repositório deve contar a história específica do projeto; este guia define o processo reutilizável.

## 1. Entrada e diagnóstico

- Receber briefing, objetivo comercial, público, marca, paleta, fontes, assets e referências, inclusive em mensagens separadas.
- Auditar o site existente: proposta de valor, arquitetura, legibilidade, UX/UI, conteúdo, conversão, mobile e acessibilidade.
- Registrar fatos verificados, hipóteses e preferências estéticas separadamente.
- Identificar o CTA prioritário e o que constitui sucesso para o protótipo.
- Quando as referências forem de terceiros, extrair padrões, sem copiar layouts, imagens ou identidade.

**Saída:** resumo estratégico e escopo aprovado.

## 2. Conceito, arquitetura e design system

- Definir conceito narrativo, posicionamento, estilo fotográfico, cores e uso de acentos.
- Planejar sitemap, rotas, seções, fluxos e estados da interface.
- Documentar tokens mínimos: tipografia, cores, grids, espaçamentos, bordas, breakpoints, hovers e animações.
- Definir o que será funcional, o que é simulado e o que fica fora do escopo.
- Validar uso de marca, fotografias e licenças para portfólio público.

**Saída:** direção visual, wireframe textual e plano de implementação.

## 3. Implementação funcional

- Usar componentes reutilizáveis, sem complexidade de backend quando não necessária.
- Incluir navegação, interações, conteúdo real quando verificável e dados fictícios claramente identificados.
- Testar em desktop e mobile; considerar toque, teclado, foco e reduced motion.
- Manter credenciais fora do Git e dependências declaradas/lockfile sincronizado.
- Ajustar o protótipo iterativamente a partir de capturas, feedback e testes.

**Saída:** site navegável localmente.

## 4. Revisão e publicação

Checklist mínimo:
- [ ] `npm run build` sem erros
- [ ] Páginas e links principais funcionando
- [ ] Navegação mobile verificada
- [ ] Imagens carregando e enquadradas corretamente
- [ ] Hovers e componentes interativos verificados
- [ ] Dados reais revisados; simulações identificadas
- [ ] Contraste, semântica e uso de teclado revisados
- [ ] Repositório com `.gitignore` seguro
- [ ] Deploy Vercel em `READY`
- [ ] URL pública aberta e conferida

**Saída:** URL funcional que pode ser apresentada no navegador. Não produzir deck como entrega padrão.

## 5. Documentação do portfólio

Todo repositório público deve conter:
1. Título e resumo do produto.
2. Link de demonstração e status conceitual/produtivo.
3. Problema observado e objetivo do redesign.
4. Público, escopo e restrições.
5. Decisões UX/UI com justificativas, sem alegar métricas inexistentes.
6. Funcionalidades implementadas e limites da demonstração.
7. Tecnologias realmente utilizadas.
8. Como executar localmente.
9. Capturas reais de desktop/mobile, quando disponíveis.
10. Créditos, fontes dos assets, ressalvas sobre direitos e próximos passos.

**Não afirmar resultados comerciais, aumento de conversão, pesquisas com usuários ou testes que não foram efetivamente conduzidos.** Diferenciar proposta conceitual de trabalho contratado/implantado pelo cliente.

## 6. Evolução contínua

- Usar commits descritivos e manter a branch principal publicável.
- Atualizar o README após mudanças de escopo, funcionalidades ou URL.
- Arquivar capturas com nomes estáveis, por exemplo `docs/screenshots/home-desktop.png` e `home-mobile.png`.
- Para cada novo case, registrar: briefing → auditoria → conceito → arquitetura → componentes → implementação → testes → deploy → documentação.

## Aplicação: Acordare

- **Objetivo:** posicionamento e contato com lojas.
- **Preservado:** logo, cores e informações institucionais verificáveis.
- **Redesenhado:** narrativa da Home, navegação, cards de ambientes, Hero e localizador de lojas.
- **Funcional:** três rotas, filtros, carrosséis e mapa com cards.
- **Limite:** pins aproximados, imagens externas e inexistência de backend operacional.
- **Publicação:** https://acordare-redesign.vercel.app
