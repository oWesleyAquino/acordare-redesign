# Acordare — conceito de redesign institucional

Protótipo demonstrativo responsivo em Next.js, React e TypeScript. Não é o site oficial. O conteúdo histórico e os endereços são baseados no site público da Acordare (consulta outubro/2026), e a proposta textual/editorial é conceitual.

## Rodar localmente

```powershell
npm install
npm run dev
```

Abra http://localhost:3000

## Páginas
- `/`: Home com hero, editorial, ambientes, diferenciais, slider e mapa interativo.
- `/ambientes`: galeria com filtros.
- `/nossa-historia`: institucional.

## Assets
- Logotipo local: `public/images/acordare-logo.png` (fornecido pelo usuário).
- Fotografias: URLs remotas do domínio `acordare.com.br` em `lib/data.ts`; se o site original mudar, será preciso atualizar URLs ou substituir por arquivos locais.
- Mapa: Leaflet + tiles OpenStreetMap; requer internet durante uso. Cada pin está localizado aproximadamente no **centro da cidade**, e não na coordenada verificada da fachada da loja; as três unidades de Santa Rosa e as duas de Erechim compartilham pins de cidade e aparecem individualmente na lista. Os endereços estão no card.

## Próximas evoluções
- Validar todas as imagens e horários/telefones das lojas.
- Substituir posições aproximadas por geocodificação validada das unidades.
- Incluir links de WhatsApp específicos verificados para cada loja.
- Testar build, performance, acessibilidade, navegação e responsividade em ambiente local antes de publicar.

## Avisos
Protótipo não afiliado à operação do site oficial. Não há formulário de captura nem coleta de dados. As fotografias são utilizadas nesta demonstração conforme autorização do usuário.
