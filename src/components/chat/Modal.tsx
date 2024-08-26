// Reusable 


export function Modal({
    title,
    description,
    onClose,
    onConfirm,
  }: {
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
  }) {
    return (
      <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
          {/* Modal Header */}
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white">
            {title}
          </h3>
  
          {/* Modal Description */}
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
  
          {/* Modal Actions */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-300 duration-300 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-400 dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 duration-300 text-white rounded-lg hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  