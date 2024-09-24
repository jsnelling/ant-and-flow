import { ControlButton } from '@xyflow/react';
import { Drawer } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import { useNodeMapContext } from '@/lib/context';

export function NodeDebugger() {
  const context = useNodeMapContext();

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <ControlButton onClick={handleOpen}>
        <KeyOutlined />
      </ControlButton>

      {open && (
        <Drawer onClose={handleClose} open placement='right' title='Debugger'>
          <pre>{JSON.stringify(context, null, 2)}</pre>
        </Drawer>
      )}
    </>
  );
}
