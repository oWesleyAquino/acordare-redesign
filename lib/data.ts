export const ASSETS = {
 hero: 'https://acordare.com.br/wp-content/uploads/2026/04/sala-de-estar-01-scaled.png',
 living:'https://acordare.com.br/wp-content/uploads/2026/04/ambiente-013-scaled.png',
 bedroom:'https://images.unsplash.com/photo-1721216596273-586bfde422e7?auto=format&fit=crop&w=1800&q=85',
 dining:'https://acordare.com.br/wp-content/uploads/2026/04/mesa-flora-scaled.png',
 outdoor:'https://acordare.com.br/wp-content/uploads/2026/04/ambiente-03-scaled.png',
 office:'https://acordare.com.br/wp-content/uploads/2026/04/ambiente-02-scaled.png',
 detail:'https://acordare.com.br/wp-content/uploads/2026/04/mind-02-1-scaled.png',
 alternate:'https://acordare.com.br/wp-content/uploads/2026/04/ambiente-02-scaled.png'
};
export type Store = {id:string;city:string;name:string;address:string;lat:number;lng:number;type:string;url:string;maps?:string};
// Endereços institucionais consultados em acordare.com.br em outubro de 2026.
// Coordenadas abaixo representam o centro aproximado das cidades, NÃO a fachada da loja.
export const stores:Store[] = [
{id:'sr-premium',city:'Santa Rosa',name:'Santa Rosa · Premium',address:'R. Cristóvão Colombo, 194 — Centro',lat:-27.8705,lng:-54.4801,type:'Premium',url:'https://acordare.com.br/santa-rosa-premium/'},
{id:'sr-outlet',city:'Santa Rosa',name:'Santa Rosa · Outlet',address:'Av. América, 190 — Centro',lat:-27.8705,lng:-54.4801,type:'Outlet',url:'https://acordare.com.br/santa-rosa-outlet/'},
{id:'sr-moveis',city:'Santa Rosa',name:'Santa Rosa · Móveis',address:'Av. Tuparendi, 1925 — Bairro Glória',lat:-27.8705,lng:-54.4801,type:'Móveis',url:'https://acordare.com.br/santa-rosa-moveis/'},
{id:'tres-maio',city:'Três de Maio',name:'Três de Maio',address:'Av. Uruguai, 369',lat:-27.7733,lng:-54.2394,type:'Loja',url:'https://acordare.com.br/tres-de-maio/'},
{id:'tres-passos',city:'Três Passos',name:'Três Passos',address:'Av. Ijuí, 101 — Centro',lat:-27.4544,lng:-53.9305,type:'Loja',url:'https://acordare.com.br/tres-passos/'},
{id:'santa-maria',city:'Santa Maria',name:'Santa Maria',address:'Av. Gov. Walter Jobim, 479 — Patronato',lat:-29.6868,lng:-53.8149,type:'Loja',url:'https://acordare.com.br/santa-maria/'},
{id:'santo-angelo',city:'Santo Ângelo',name:'Santo Ângelo',address:'Av. Brasil, 671 — Centro',lat:-28.299,lng:-54.263,type:'Loja',url:'https://acordare.com.br/santo-angelo/'},
{id:'erechim-colchoes',city:'Erechim',name:'Erechim · Colchões',address:'Av. Sete de Setembro, 920 — Centro',lat:-27.6351,lng:-52.2733,type:'Colchões',url:'https://acordare.com.br/erechim-colchoes/'},
{id:'erechim-moveis',city:'Erechim',name:'Erechim · Móveis',address:'Av. Pedro Pinto de Souza, 563 — Centro',lat:-27.6351,lng:-52.2733,type:'Móveis',url:'https://acordare.com.br/erechim-moveis/'},
{id:'passo-fundo',city:'Passo Fundo',name:'Passo Fundo',address:'Av. Brasil Leste, 2222 — Petrópolis',lat:-28.2628,lng:-52.4066,type:'Loja',url:'https://acordare.com.br/passo-fundo/'},
{id:'ijui',city:'Ijuí',name:'Ijuí',address:'Rua Cristiano Leite, 461 — Centro',lat:-28.3878,lng:-53.9149,type:'Loja',url:'https://acordare.com.br/ijui/',maps:'https://maps.app.goo.gl/3aYA39u1tvWdwaLr6'}
];
export const categories = [
 {name:'Sala de estar',image:ASSETS.hero,slug:'sala-de-estar',desc:'O lugar de estar junto.'},
 {name:'Dormitórios',image:ASSETS.bedroom,slug:'dormitorios',desc:'Seu espaço de descanso.'},
 {name:'Sala de jantar',image:ASSETS.dining,slug:'sala-de-jantar',desc:'Encontros que ficam.'},
 {name:'Área externa',image:ASSETS.outdoor,slug:'area-externa',desc:'Viver também é lá fora.'},
 {name:'Corporativo',image:ASSETS.office,slug:'corporativo',desc:'Ambientes para criar.'}
];
