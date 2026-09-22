import { Composition } from 'remotion';
import type { DemoId } from './florvia-demo';
import './styles.css';
import { AppMockup } from './app-mockups';
import { AppVideo } from './app-video';

const demos: Array<{ id: DemoId; compositionId: string }> = [
  { id: 'receive', compositionId: 'FlorviaReceive' },
  { id: 'inventory', compositionId: 'FlorviaInventory' },
  { id: 'dispatch', compositionId: 'FlorviaDispatch' },
  { id: 'liquidation', compositionId: 'FlorviaLiquidation' },
  { id: 'dashboard', compositionId: 'FlorviaDashboard' },
];

export function RemotionRoot() {
  return (
    <>
      {demos.map((demo) => <Composition key={`mockup-${demo.id}`} id={`Mockup-${demo.id}`} component={AppMockup} defaultProps={{demo: demo.id}} durationInFrames={1} fps={30} width={1200} height={900} />)}
      {demos.map((demo) => (
        <Composition
          key={demo.id}
          id={demo.compositionId}
          component={AppVideo}
          defaultProps={{ demo: demo.id }}
          durationInFrames={360}
          fps={30}
          width={1200}
          height={900}
        />
      ))}
    </>
  );
}
