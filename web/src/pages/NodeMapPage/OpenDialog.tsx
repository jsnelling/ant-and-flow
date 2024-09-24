import { Alert, List, Modal, ModalProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { listPipelines, PipelineBrief } from '@/lib/api';
import { useData, UseDialogButton } from '@/lib/hooks';

type OpenDialogProps = {
  onSelect(save: PipelineBrief): void;
  onClose: UseDialogButton['handleClose'];
};

export function OpenDialog({
  onClose: handleClose,
  onSelect,
}: OpenDialogProps) {
  const { data, error, loading } = useData({
    func: listPipelines,
    args: [],
    watch: [],
  });
  const [selection, setSelection] = useState<PipelineBrief>();

  const handleSelect = useCallback(() => {
    if (!selection) {
      throw new Error('no selection');
    }

    onSelect(selection);
    handleClose();
  }, [handleClose, onSelect, selection]);

  const listItem = useCallback(
    (item: PipelineBrief) => {
      const selected = selection === item;

      return (
        <List.Item
          className={classNames(selected && 'bg-black/20')}
          onClick={() => setSelection(item)}
        >
          {item.name}
        </List.Item>
      );
    },
    [selection, setSelection],
  );

  const okProps = useMemo<ModalProps['okButtonProps']>(
    () => ({
      disabled: !selection,
    }),
    [selection],
  );

  return (
    <Modal
      okButtonProps={okProps}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={handleSelect}
      open
      title='Open Flow'
    >
      <List
        bordered
        className='overflow-clip'
        dataSource={data}
        loading={loading}
        renderItem={listItem}
      />

      {error && <Alert message={error.message} type='error' />}
    </Modal>
  );
}
