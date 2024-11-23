import React from 'react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const CustomConfirmModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  confirmLabel = 'Confirm',
  onConfirm,
}) => {

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg p-6 z-10">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="mt-4">{content}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              onClose();
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmModal;
