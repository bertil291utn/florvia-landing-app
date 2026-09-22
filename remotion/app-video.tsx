import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { AppMockup } from './app-mockups';
import type { DemoId } from './florvia-demo';

const flows: Record<DemoId, { title: string; fields: [string, string][]; action: string; result: string; target: [number, number] }> = {
  receive: { title: 'Nueva recepción', fields: [['Origen', 'Carlos Valverde'], ['Variedad', 'Freedom'], ['Longitud', '60 cm'], ['Cantidad', '100 tallos']], action: 'Registrar ingreso', result: 'REC-044 registrada · 100 tallos por clasificar', target: [1054, 206] },
  inventory: { title: 'Movimientos · Freedom', fields: [['Lote', 'REC-041'], ['Ingreso clasificado', '+600 tallos'], ['Pedido PED-018', '200 comprometidos'], ['Disponible', '400 tallos']], action: 'Volver al inventario', result: 'Freedom · 400 tallos disponibles', target: [1040, 206] },
  dispatch: { title: 'Preparar PED-018', fields: [['Cliente', 'Cliente de mostrador'], ['Caja 01 · Freedom', '200 tallos'], ['Caja 02 · Explorer', '100 tallos'], ['Total preparado', '300 tallos · 2 cajas']], action: 'Marcar como preparado', result: 'PED-018 preparado · 2 cajas · 300 tallos', target: [916, 744] },
  liquidation: { title: 'Revisar liquidación', fields: [['Proveedor', 'José Bolaños'], ['Recepción REC-041', '600 tallos'], ['Precio unitario', '$0,20 por tallo'], ['Total del borrador', '$120,00']], action: 'Guardar borrador', result: 'Borrador guardado · José Bolaños · $120,00', target: [1070, 606] },
  dashboard: { title: 'Pendiente de clasificación', fields: [['Recepción', 'REC-042'], ['Origen', 'Marco Quimbiamba'], ['Variedad', 'Mondial'], ['Por clasificar', '400 tallos']], action: 'Volver al resumen', result: 'REC-042 · Pendiente de clasificación', target: [536, 722] },
};

const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

export function AppVideo({ demo }: { demo: DemoId }) {
  const frame = useCurrentFrame();
  const flow = flows[demo];
  const open = frame >= 70 && frame < 250;
  const confirmed = frame >= 250 && frame < 330;
  const slide = interpolate(frame, [70, 87], [480, 0], clamp);
  const waypoints = [0, 25, 58, 90, 135, 170, 215, 238, 280, 330, 359];
  const xs = [1120,1120,flow.target[0],flow.target[0],840,840,915,915,1090,1120,1120];
  const ys = [110,110,flow.target[1],flow.target[1],365,465,820,820,780,110,110];
  const click = [64,240].some(f => frame >= f && frame < f + 8);
  return <AbsoluteFill style={{overflow:'hidden'}}>
    <AppMockup demo={demo}/>
    {open && <><AbsoluteFill style={{background:'rgba(20,22,28,.16)',opacity:interpolate(frame,[70,87],[0,1],clamp)}}/><div className="flow-drawer" style={{transform:`translateX(${slide}px)`}}><h2>{flow.title}</h2><p>Postcosecha</p>{flow.fields.map(([label,value],i)=><div className={`flow-input ${frame >= 100+i*25 ? 'complete' : ''}`} key={label}><label>{label}</label><strong>{frame >= 100+i*25 ? value : 'Seleccionar'}</strong></div>)}<div className="flow-button">{flow.action}</div></div></>}
    {confirmed && <div className="flow-result" style={{opacity:interpolate(frame,[250,260,318,330],[0,1,1,0],clamp)}}>✓ {flow.result}</div>}
    <svg width="32" height="42" viewBox="0 0 32 42" style={{position:'absolute',left:interpolate(frame,waypoints,xs),top:interpolate(frame,waypoints,ys),transform:`scale(${click?.88:1})`,filter:'drop-shadow(0 2px 3px #0005)',pointerEvents:'none'}}><path d="M3 2 L3 32 L11 24 L18 38 L24 35 L17 22 L29 22 Z" fill="#17181c" stroke="white" strokeWidth="2"/></svg>
  </AbsoluteFill>;
}
