import { Form, FormProps, Input, Modal } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { dumpContext, useNodeMapContext } from '@/lib/context';
import { Pipeline, PipelineBrief, savePipeline } from '@/lib/api';
import { UseDialogButton } from '@/lib/hooks';

type SaveDialogProps = {
  onClose: UseDialogButton['handleClose'];
  onSave(save: PipelineBrief): void;
};

type SaveHandler = NonNullable<FormProps<PipelineBrief>['onFinish']>;

export function SaveDialog({ onClose: handleClose, onSave }: SaveDialogProps) {
  const [form] = Form.useForm();
  const context = useNodeMapContext();
  const navigate = useNavigate();

  const {
    briefState: [brief],
  } = context;

  const handleSave = useCallback<SaveHandler>(
    async (brief) => {
      const save = dumpContext(context);
      const pipeline = { ...brief, save } satisfies Pipeline;
      const resp = await savePipeline(pipeline);

      onSave(resp.data);
      handleClose();

      navigate({
        to: '/node/$nodeId',
        params: { nodeId: String(resp.data.id) },
      });
    },
    [context, handleClose, navigate, onSave],
  );

  return (
    <Modal
      onCancel={handleClose}
      onClose={handleClose}
      onOk={form.submit}
      open
      title='Save Flow'
    >
      <Form form={form} initialValues={brief} onFinish={handleSave}>
        <Form.Item name='name' label='Name'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
