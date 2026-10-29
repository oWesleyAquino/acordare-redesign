import './globals.css';
import 'leaflet/dist/leaflet.css';
import {Header,Footer} from '@/components/site-shell';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Acordare | O conforto transforma tudo',description:'Conceito demonstrativo de redesign da Acordare — móveis, colchões e ambientes que inspiram.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><Header/><main>{children}</main><Footer/></body></html>}
