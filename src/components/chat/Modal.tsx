export function Modal({
  title,
  description,
  onClose,
  onConfirm,
  children, 
}: {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onKeyDown={handleKeyDown}
      aria-modal="true"
      role="dialog"
      tabIndex={-1} 
    >
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white"
        >
          ✖
        </button>

        <h3 className="text-lg font-medium text-neutral-800 dark:text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">{description}</p>
        )}
        {children && <div className="mt-4">{children}</div>}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-300 duration-300 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-400 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 duration-300 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
