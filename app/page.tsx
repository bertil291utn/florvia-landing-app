'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import { DemoLoop } from './demo-loop';

function Mark() {
  return <span className="mark" aria-hidden="true"><i /><i /><i /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleMenuKeydown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape') setMenuOpen(false);
  }

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Principal">
          <a className="brand" href="#inicio" aria-label="Florvia, inicio"><Mark /><span>Florvia</span></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} onKeyDown={handleMenuKeydown} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}><span /><span /></button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="main-navigation">
            <a onClick={closeMenu} href="#problema">El problema</a>
            <a onClick={closeMenu} href="#plataforma">Plataforma</a>
            <a onClick={closeMenu} href="#piloto">Piloto</a>
            <a onClick={closeMenu} href="#formulario" className="nav-cta">Ver la demostración</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-petal" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            
            <h1>Tu postcosecha bajo control, <em>sin depender de Excel.</em></h1>
            <p className="lead">Recibe flor, controla calidad y disponibilidad, prepara pedidos y liquida a proveedores desde una sola plataforma.</p>
            <div className="hero-actions"><a className="button button-dark" href="#formulario">Ver cómo participar en el piloto</a><a className="text-link" href="#plataforma">Conocer el alcance inicial</a></div>
           
          </div>
          <div className="hero-visual"><DemoLoop demo="receive" /></div>
        </div>
         </section>

      <section className="problem section" id="problema">
        <div className="shell split-heading"><div><h2>Cuando la información está repartida, <em>decidir se vuelve más difícil.</em></h2><p>La operación sucede rápido; encontrar una respuesta no debería tomar horas de llamadas, archivos y memoria.</p></div></div>
        <div className="shell problem-grid"><div className="scattered" aria-label="Información dispersa"><span className="paper paper-excel">Excel <small>Recepción</small></span><span className="paper paper-chat">WhatsApp <small>¿Cuánta flor quedó?</small></span><span className="paper paper-note">Notas <small>Proveedor / baja</small></span><span className="scatter-line line-one" /><span className="scatter-line line-two" /></div><div className="problem-copy"><h3>Excel, WhatsApp, papel y personas clave.</h3><ul><li>No saber con rapidez qué llegó de cada proveedor.</li><li>Perder visibilidad sobre calidad, disponibilidad y pedidos.</li><li>Resolver liquidaciones manualmente al cierre de cada período.</li></ul></div></div>
      </section>

      <section className="platform section" id="plataforma">
        <div className="shell split-heading platform-heading"><div><h2>El orden que necesita la operación. <em>Ni más, ni menos.</em></h2></div></div>
        <div className="shell module-grid"><article className="module-card module-large"><div><h3>Recibe y clasifica</h3><p>Flor propia y de proveedores, variedad, cantidad, longitud, calidad y motivo de baja.</p></div><DemoLoop demo="receive" /></article><article className="module-card"><h3>Controla disponibilidad</h3><p>Consulta la flor disponible y sus movimientos básicos antes de comprometer un pedido.</p><DemoLoop demo="inventory" /></article><article className="module-card module-dispatch"><h3>Prepara y despacha</h3><p>Registra clientes y pedidos; organiza cajas e información esencial de despacho.</p><DemoLoop demo="dispatch" /></article><article className="module-card module-liquidation"><div><h3>Liquida con claridad</h3><p>Consolida lo recibido y clasificado, prepara el reporte y registra factura, pago y saldo.</p><span className="difference">Una liquidación al proveedor no es una factura de venta.</span></div><DemoLoop demo="liquidation" /></article></div>
      </section>

      <section className="operation-story section" aria-labelledby="operation-story-title">
        <div className="shell operation-intro">
          
          <h2 id="operation-story-title">Registra lo que pasa donde pasa. <em>Entiende el negocio cuando lo necesitas.</em></h2>
          <p>Florvia acompaña el recorrido de la rosa desde el lote y la mesa de clasificación hasta la conversación que define el día de la empresa.</p>
        </div>
        <div className="shell field-story">
          <div className="field-story-copy">
            <h3>La información sigue el ritmo del equipo.</h3>
            <p>Registra recepción, calidad y bajas desde tablet, junto a la flor. La operación continúa incluso cuando no hay conexión a internet.</p>
          </div>
          <figure className="story-photo story-photo-field"><img src="/rose-greenhouse-tablet-notes.png" alt="Trabajadora registrando información de rosas desde una tablet en un invernadero" /></figure>
          <figure className="story-photo story-photo-postharvest"><img src="/rose-postharvest-offline-tablet.png" alt="Equipo clasificando rosas en poscosecha mientras registra la operación desde una tablet" /></figure>
        </div>
        <div className="shell management-story">
          <div className="management-photos">
            <figure className="story-photo story-photo-office"><img src="/flower-business-dashboard-office.png" alt="Equipo revisando el dashboard de una empresa florícola en la oficina" /></figure>
            <figure className="story-photo story-photo-tablet"><img src="/flower-dashboard-tablet-operation.png" alt="Responsable revisando indicadores de la operación florícola desde una tablet" /></figure>
          </div>
          <div className="management-story-copy">
            <h3>Una vista clara de cómo va la empresa.</h3>
            <p>Lo que el equipo registra se convierte en una lectura compartida de disponibilidad, pedidos, despachos y liquidaciones. Gerencia puede revisar la operación desde web o tablet, sin reunir reportes manuales.</p>
            <a className="button button-dark" href="#formulario">Ver cómo participar en el piloto</a>
          </div>
        </div>
      </section>

      <section className="dashboard section" id="dashboard"><div className="shell dashboard-top"><div><h2>Ve cómo va tu operación <em>sin armar reportes manuales.</em></h2></div><p>Para entender el día a día desde web, mientras el equipo trabaja desde tablet.</p></div><div className="shell dashboard-frame-wrap"><DemoLoop demo="dashboard" /></div></section>

      <section className="fit section"><div className="shell fit-grid"><div className="fit-photo"><img src="/rose-plantation-ecuador.jpg" alt="Rosas cultivadas en invernadero ecuatoriano" /><span>Fotografía de referencia</span></div><div className="fit-copy"><h2>Para postcosechas pequeñas que reciben flor propia <em>y de proveedores.</em></h2><p>Ideal para empresas que trabajan con proveedores y quieren dejar de depender de hojas dispersas, sin adoptar una solución sobredimensionada.</p><div className="fit-points"><span>Flor propia y de proveedores</span><span>Operación desde tablet</span><span>Gerencia desde web</span></div></div></div></section>

      <section className="pilot section" id="piloto"><div className="shell pilot-card"><div className="pilot-content"><div><h2>Construyamos una solución ajustada a la <em>realidad operativa.</em></h2></div><div><p>El programa piloto parte de una conversación sobre la operación, para definir un primer alcance junto al equipo participante.</p><a className="button button-light" href="#formulario">Ver el estado del programa</a></div></div></div></section>

      <section className="form-section section" id="formulario"><div className="shell form-layout"><div><h2>Cuéntanos sobre tu operación.</h2><p>Completa el formulario para que el equipo de Florvia conozca tu operación y pueda ponerse en contacto contigo sobre el programa piloto.</p></div><div className="form-embed-window"><iframe className="form-embed" src="https://docs.google.com/forms/d/e/1FAIpQLSeHGIPZAJh1wygezj4-FXD3XqHmSp-438pDV8uw_g-pi8YKcA/viewform?embedded=true" title="Formulario Florvia" loading="lazy">Cargando formulario…</iframe></div></div></section>

      <footer><div className="shell footer-grid"><a className="brand" href="#inicio"><Mark /><span>Florvia</span></a><p>Una plataforma en construcción para postcosechas florícolas pequeñas.</p><span>© {new Date().getFullYear()} Florvia</span></div></footer>
    </main>
  );
}
