import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="bg-card text-card-foreground w-full max-w-md rounded-lg shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="p-6">
          <h2 id="dialog-title" className="mb-2 text-lg font-semibold">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">{description}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-ring rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
