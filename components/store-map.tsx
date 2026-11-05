"use client";

import {useCallback, useEffect, useRef, useState} from 'react';
import {ArrowUpRight, MapPin, X, Search, Navigation, ChevronDown} from 'lucide-react';
import {stores, type Store} from '@/lib/data';

const cities = ['Todas as cidades', ...new Set(stores.map(store => store.city))];
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function StoreMap() {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const reducedMotion = useRef(true);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const storeButtons = useRef(new Map<string, HTMLButtonElement>());
  const restoreFocus = useRef<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [city, setCity] = useState('Todas as cidades');
  const [query, setQuery] = useState('');
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const selected = stores.find(store => store.id === selectedId) ?? null;
  const matches = stores.filter(store => (city === 'Todas as cidades' || store.city === city)
    && normalize(`${store.name} ${store.address} ${store.city}`).includes(normalize(query)));

  const zoomTo = useCallback((store: Store | null) => {
    const map = mapRef.current;
    if (!map) return;
    const center: [number, number] = store ? [store.lat, store.lng] : [-28.35, -53.35];
    map.stop();
    if (reducedMotion.current) map.setView(center, store ? 10 : 7, {animate: false});
    else map.flyTo(center, store ? 10 : 7, {duration: .7});
  }, []);

  const choose = useCallback((store: Store) => {
    restoreFocus.current = null;
    setSelectedId(store.id);
    setCity(store.city);
    setQuery('');
    zoomTo(store);
  }, [zoomTo]);

  useEffect(() => {
    if (!el.current) return;
    let cancelled = false;
    let resizeTimer: number | undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotion.current = media.matches;
      if (media.matches) mapRef.current?.stop();
    };
    updateMotion();
    media.addEventListener('change', updateMotion);
    async function init() {
      try {
        const L = await import('leaflet');
        if (cancelled || !el.current) return;
        const map = L.map(el.current, {scrollWheelZoom: false, zoomControl: false}).setView([-28.35, -53.35], 7);
        mapRef.current = map;
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors', maxZoom: 19,
        });
        tiles.once('tileerror', () => {if (!cancelled) setMapStatus('unavailable');});
        tiles.addTo(map);
        L.control.zoom({position: 'bottomright'}).addTo(map);
        const byCity = new Map<string, Store[]>();
        stores.forEach(store => byCity.set(store.city, [...(byCity.get(store.city) ?? []), store]));
        const markers: import('leaflet').Marker[] = [];
        let focusAfterZoom: string | null = null;
        // Agrupar cidades cujos alvos se sobreporiam no zoom atual, sem dependências extras.
        function renderMarkers() {
          markers.forEach(marker => marker.remove());
          markers.length = 0;
          const groups: {name: string; locations: Store[]; point: import('leaflet').Point}[][] = [];
          for (const [name, locations] of byCity) {
            const point = map.latLngToLayerPoint([locations[0].lat, locations[0].lng]);
            const group = groups.find(items => items.some(item => item.point.distanceTo(point) < 56));
            const item = {name, locations, point};
            if (group) group.push(item); else groups.push([item]);
          }
          for (const group of groups) {
            const centerPoint = L.point(group.reduce((sum, item) => sum + item.point.x, 0) / group.length,
              group.reduce((sum, item) => sum + item.point.y, 0) / group.length);
            const center = map.layerPointToLatLng(centerPoint);
            const label = group.length > 1 ? `Ampliar lojas em ${group.map(item => item.name).join(' e ')}` : `Lojas Acordare em ${group[0].name}`;
            const pin = L.divIcon({className: 'store-pin-wrap',
              html: group.length > 1 ? `<div class="store-pin store-pin-count">${group.length}</div>` : '<div class="store-pin"><span></span></div>',
              iconSize: [38, 38], iconAnchor: [19, 34]});
            const marker = L.marker(center, {icon: pin, title: label, alt: label}).addTo(map);
            marker.on('click', () => {
              if (group.length === 1) {choose(group[0].locations[0]); return;}
              if (marker.getElement()?.contains(document.activeElement)) focusAfterZoom = group[0].name;
              map.stop();
              if (reducedMotion.current) map.setView(center, Math.min(map.getZoom() + 2, 18), {animate: false});
              else map.flyTo(center, Math.min(map.getZoom() + 2, 18), {duration: .7});
            });
            marker.getElement()?.addEventListener('keydown', event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                marker.fire('click');
              }
            });
            markers.push(marker);
            if (focusAfterZoom && group.some(item => item.name === focusAfterZoom)) {
              marker.getElement()?.focus({preventScroll: true});
              focusAfterZoom = null;
            }
          }
        }
        map.on('zoomend', renderMarkers);
        renderMarkers();
        setMapStatus('ready');
        resizeTimer = window.setTimeout(() => {if (!cancelled) map.invalidateSize();}, 100);
      } catch {
        if (!cancelled) {
          mapRef.current?.remove();
          mapRef.current = null;
          setMapStatus('unavailable');
        }
      }
    }
    void init();
    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      media.removeEventListener('change', updateMotion);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [choose]);

  useEffect(() => {
    if (selected) detailHeading.current?.focus({preventScroll: true});
    else if (restoreFocus.current) {
      storeButtons.current.get(restoreFocus.current)?.focus({preventScroll: true});
      restoreFocus.current = null;
    }
  }, [selected]);

  function closeDetail() {
    restoreFocus.current = selectedId;
    setSelectedId(null);
  }

  return <div className="locator">
    <div className="locator-map-wrap">
      <div className="locator-map" ref={el} role="region" aria-label="Mapa interativo das cidades com lojas Acordare" />
      {mapStatus !== 'ready' && <p className="map-status" role="status">
        {mapStatus === 'loading' ? 'Carregando mapa. A lista de lojas já está disponível.' : 'Mapa indisponível. Use a lista de lojas e os links de localização.'}
      </p>}
    </div>
    <div className="locator-aside">
      <div className="locator-head"><span className="eyebrow"><span className="eyebrow-dot" /> PERTO DE VOCÊ</span>
        <h3>Encontre a sua<br />Acordare.</h3><p>Selecione uma cidade ou explore os pontos no mapa para conhecer nossas lojas.</p></div>
      <label className="select-wrap"><MapPin size={18} aria-hidden="true" />
        <select aria-label="Filtrar por cidade" value={city} onChange={event => {
          restoreFocus.current = null;
          setCity(event.target.value);
          setSelectedId(null);
          zoomTo(stores.find(store => store.city === event.target.value) ?? null);
        }}>{cities.map(name => <option key={name}>{name}</option>)}</select><ChevronDown size={17} aria-hidden="true" /></label>
      <label className="search-wrap"><Search size={18} aria-hidden="true" />
        <input type="search" value={query} placeholder="Buscar uma unidade" aria-label="Buscar unidade" onChange={event => {
          restoreFocus.current = null;
          setQuery(event.target.value);
          setSelectedId(null);
        }} /></label>
      {selected ? <section className="store-detail" aria-labelledby="store-detail-title" onKeyDown={event => {
        if (event.key === 'Escape') {event.preventDefault(); closeDetail();}
      }}>
        <button type="button" className="store-close" aria-label="Fechar card da loja" onClick={closeDetail}><X size={18} /></button>
        <span className="store-type">ACORDARE · {selected.type.toUpperCase()}</span>
        <h4 id="store-detail-title" tabIndex={-1} ref={detailHeading}>{selected.name}</h4>
        <p><MapPin size={16} aria-hidden="true" />{selected.address}, {selected.city}/RS</p>
        <div className="store-actions">
          <a href={selected.maps ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Acordare ${selected.address} ${selected.city} RS`)}`} target="_blank" rel="noopener noreferrer">Como chegar <Navigation size={15} /></a>
          <a href={selected.url} target="_blank" rel="noopener noreferrer">Contatos da loja <ArrowUpRight size={15} /></a>
        </div>
      </section> : <div className="store-list">
        <span className="list-label" role="status">{matches.length} {matches.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}</span>
        <div className="store-list-scroll">{matches.map(store => <button type="button" className="store-list-item" key={store.id}
          ref={node => {if (node) storeButtons.current.set(store.id, node); else storeButtons.current.delete(store.id);}}
          onClick={() => choose(store)}><span><b>{store.name}</b><small>{store.city}/RS</small></span><ArrowUpRight size={17} /></button>)}
          {!matches.length && <p className="no-results">Nenhuma unidade encontrada.</p>}
        </div>
      </div>}
      <small className="map-note">Pins por cidade (posições aproximadas). Endereços de cada unidade constam no card.</small>
    </div>
  </div>;
}
