import { Button } from 'antd';
import {
  FileOutlined,
  FolderOpenOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { dumpContext, useNodeMapContext } from '@/lib/context';
import { PipelineBrief, savePipeline } from '@/lib/api';
import { useDialogButton } from '@/lib/hooks';

import { OpenDialog } from './OpenDialog';
import { SaveDialog } from './SaveDialog';

export function NewFlowButton() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate({ to: '/' });
  }, [navigate]);

  return <Button icon={<FileOutlined />} onClick={handleClick} />;
}

export function OpenFlowButton() {
  const { handleClick, handleClose, open } = useDialogButton();
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (selection: PipelineBrief) => {
      navigate({
        to: '/node/$nodeId',
        params: { nodeId: String(selection.id) },
      });
    },
    [navigate],
  );

  return (
    <>
      <Button icon={<FolderOpenOutlined />} onClick={handleClick} />

      {open && <OpenDialog onClose={handleClose} onSelect={handleSelect} />}
    </>
  );
}

type SaveFlowButtonProps = { isNew: boolean };

export function SaveFlowButton({ isNew }: SaveFlowButtonProps) {
  const context = useNodeMapContext();
  const { handleClick: openDialog, handleClose, open } = useDialogButton();
  const navigate = useNavigate();

  const handleSaveAs = useCallback(
    (save: PipelineBrief) => {
      navigate({ to: '/node/$nodeId', params: { nodeId: String(save.id) } });
    },
    [navigate],
  );

  const handleClick = useCallback<MouseEventHandler>(
    async (e) => {
      if (e.shiftKey || isNew) {
        openDialog();
      } else {
        const {
          briefState: [brief],
        } = context;
        if (!brief) {
          throw new Error('missing brief');
        }

        const { id, name } = brief;
        const save = dumpContext(context);

        await savePipeline({ id, name, save });
      }
    },
    [context, isNew, openDialog],
  );

  return (
    <>
      <Button icon={<SaveOutlined />} onClick={handleClick} />

      {open && <SaveDialog onClose={handleClose} onSave={handleSaveAs} />}
    </>
  );
}
