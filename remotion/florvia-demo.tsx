import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type DemoId = 'receive' | 'inventory' | 'dispatch' | 'liquidation' | 'dashboard';

type Scene = {
  title: string;
  detail: string;
  action: string;
  focus: string;
  cursor: [number, number];
};

type DemoDefinition = {
  section: string;
  navigation: string[];
  fields: string[];
  scenes: Scene[];
};

const demos: Record<DemoId, DemoDefinition> = {
  receive: {
    section: 'Recepción y postcosecha',
    navigation: ['Nueva recepción', 'Clasificación', 'Bajas'],
    fields: ['Proveedor', 'Variedad', 'Calidad'],
    scenes: [
      { title: 'Registrar ingreso', detail: 'La información de recepción comienza en un solo lugar.', action: 'Nueva recepción', focus: 'Nueva recepción', cursor: [742, 182] },
      { title: 'Identificar la flor', detail: 'El registro guía los datos necesarios para clasificar.', action: 'Continuar con clasificación', focus: 'Variedad', cursor: [471, 423] },
      { title: 'Dejar preparado el registro', detail: 'La recepción queda lista para una revisión posterior.', action: 'Borrador preparado', focus: 'Calidad', cursor: [700, 630] },
    ],
  },
  inventory: {
    section: 'Inventario',
    navigation: ['Disponibilidad', 'Movimientos', 'Compromisos'],
    fields: ['Flor disponible', 'Movimiento', 'Destino'],
    scenes: [
      { title: 'Consultar disponibilidad', detail: 'La operación empieza desde lo que está disponible.', action: 'Disponibilidad', focus: 'Disponibilidad', cursor: [270, 245] },
      { title: 'Revisar movimientos', detail: 'Cada cambio se consulta desde el mismo recorrido.', action: 'Movimientos', focus: 'Movimiento', cursor: [391, 244] },
      { title: 'Ver antes de comprometer', detail: 'El equipo puede revisar el destino antes de preparar un pedido.', action: 'Compromisos', focus: 'Destino', cursor: [700, 630] },
    ],
  },
  dispatch: {
    section: 'Ventas y despacho',
    navigation: ['Pedido', 'Cajas', 'Salida'],
    fields: ['Cliente', 'Cajas', 'Información de salida'],
    scenes: [
      { title: 'Abrir un pedido', detail: 'El despacho parte de la información necesaria para atender al cliente.', action: 'Pedido', focus: 'Pedido', cursor: [270, 245] },
      { title: 'Preparar cajas', detail: 'El recorrido reúne lo necesario para preparar la salida.', action: 'Preparar cajas', focus: 'Cajas', cursor: [472, 426] },
      { title: 'Dejar lista la salida', detail: 'La información esencial acompaña el despacho.', action: 'Salida preparada', focus: 'Información de salida', cursor: [700, 630] },
    ],
  },
  liquidation: {
    section: 'Proveedores',
    navigation: ['Recepción', 'Clasificación', 'Liquidación'],
    fields: ['Recepción', 'Clasificación', 'Saldo por revisar'],
    scenes: [
      { title: 'Revisar lo recibido', detail: 'La liquidación empieza en los registros de recepción.', action: 'Recepción', focus: 'Recepción', cursor: [270, 245] },
      { title: 'Consolidar clasificación', detail: 'El alcance conecta lo recibido con la calidad registrada.', action: 'Clasificación', focus: 'Clasificación', cursor: [470, 426] },
      { title: 'Preparar una liquidación', detail: 'El borrador queda listo para la revisión del equipo.', action: 'Borrador de liquidación', focus: 'Saldo por revisar', cursor: [700, 630] },
    ],
  },
  dashboard: {
    section: 'Visión gerencial',
    navigation: ['Recepción', 'Disponibilidad', 'Pagos pendientes'],
    fields: ['Recepción', 'Disponibilidad', 'Pagos pendientes'],
    scenes: [
      { title: 'Entender la recepción', detail: 'La vista reúne señales de operación sin armar reportes manuales.', action: 'Recepción', focus: 'Recepción', cursor: [270, 245] },
      { title: 'Pasar por disponibilidad', detail: 'La gerencia puede cambiar de tema desde el mismo espacio.', action: 'Disponibilidad', focus: 'Disponibilidad', cursor: [426, 245] },
      { title: 'Revisar pagos pendientes', detail: 'El alcance final mantiene visible lo que requiere seguimiento.', action: 'Pagos pendientes', focus: 'Pagos pendientes', cursor: [700, 630] },
    ],
  },
};

function sceneIndex(frame: number) {
  if (frame < 120) return 0;
  if (frame < 240) return 1;
  return 2;
}

export function FlorviaDemo({ demo }: { demo: DemoId }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const definition = demos[demo];
  const activeScene = sceneIndex(frame);
  const scene = definition.scenes[activeScene];
  const previous = definition.scenes[Math.max(activeScene - 1, 0)];
  const sceneStart = activeScene * 120;
  const contentOpacity = activeScene === 0 ? 1 : interpolate(frame - sceneStart, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorProgress = spring({ frame: Math.max(0, frame - sceneStart), fps, config: { damping: 170, stiffness: 110, mass: 0.8 } });
  const cursorX = interpolate(cursorProgress, [0, 1], [previous.cursor[0], scene.cursor[0]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(cursorProgress, [0, 1], [previous.cursor[1], scene.cursor[1]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clickPulse = interpolate(Math.sin((frame / fps) * Math.PI * 2.4), [-1, 1], [0.84, 1.1], { easing: Easing.inOut(Easing.ease) });

  return (
    <AbsoluteFill className="demo-canvas">
      <div className="demo-kicker">Demostración de alcance</div>
      <div className="demo-app">
        <header className="demo-header"><span className="demo-brand">Florvia</span><span>{definition.section}</span><span>Vista conceptual</span></header>
        <aside className="demo-sidebar"><p>Operación</p>{definition.navigation.map((item) => <span key={item} className={item === scene.focus || item === scene.action ? 'is-active' : ''}>{item}</span>)}</aside>
        <main className="demo-content" style={{ opacity: contentOpacity }}>
          <p className="demo-overline">{definition.section}</p>
          <h1>{scene.title}</h1>
          <p className="demo-detail">{scene.detail}</p>
          <div className="demo-fields">{definition.fields.map((field, index) => <div key={field} className={`demo-field ${field === scene.focus ? 'is-focused' : ''}`}><span>{field}</span><b>{field === scene.focus ? 'En revisión' : index === 0 && activeScene > 0 ? 'Listo' : 'Pendiente'}</b></div>)}</div>
          <div className="demo-action"><span>{scene.action}</span><b>{activeScene === 2 ? 'Listo para revisar' : 'Siguiente paso'}</b></div>
        </main>
      </div>
      <div className="demo-cursor" style={{ left: cursorX, top: cursorY, transform: `scale(${clickPulse})` }}><span /></div>
    </AbsoluteFill>
  );
}
