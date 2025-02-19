import { createRoot } from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';

import '../shared/assets/styles/reset.css';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
   <SkeletonTheme baseColor="#212121" highlightColor="#333">
      <App />
   </SkeletonTheme>
);
