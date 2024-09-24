import { useCallback, useState } from 'react';

export type UseDialogButtonProps = {
  onClose?(): void;
  onOpen?(): void;
};

export type UseDialogButton = ReturnType<typeof useDialogButton>;

export function useDialogButton({
  onClose,
  onOpen,
}: UseDialogButtonProps = {}) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
    onOpen?.();
  }, [onOpen, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose, setOpen]);

  return {
    handleClick,
    handleClose,
    open,
  };
}
