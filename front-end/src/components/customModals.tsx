import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router';


interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 z-10">
        {children}
      </div>
    </div>,
    document.body
  );
};


const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>


      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Add your Photo</h2>
      <div className="mt-4 text-gray-700 dark:text-gray-300">Choose the photo you want to add to the tasks</div>
      <div className="flex justify-end space-x-3 md:space-x-5 mt-6">
        <button
          className="flex flex-col gap-2 items-center justify-center bg-blue-700 text-white p-1 rounded-md hover:bg-blue-900 transition duration-300 ease-in-out"
          name='ChooseImage'
          onClick={() => navigate("selectImage/")}
        >
          Choose Image
          <svg className="w-5 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          className="flex flex-col gap-1 items-center justify-center bg-blue-700 text-white p-1 rounded-md hover:bg-blue-900 transition duration-300 ease-in-out"
          onClick={() => navigate("takePhoto/")}
        >
          Take Photo
          <svg className="w-5 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </BaseModal>

  )
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
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 z-10">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>
        <div className="mt-4 text-gray-700 dark:text-gray-300">{content}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
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
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CustomConfirmModal, PhotoModal };
