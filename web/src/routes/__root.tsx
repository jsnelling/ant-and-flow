import { createRootRoute, Outlet } from '@tanstack/react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { Theme } from '@/components';

import '@xyflow/react/dist/style.css';

const useDebugger = false;

export const Route = createRootRoute({
  component: () => (
    <DndProvider backend={HTML5Backend}>
      <Theme>
        <Outlet />
        {useDebugger && <TanStackRouterDevtools />}
      </Theme>
    </DndProvider>
  ),
});
