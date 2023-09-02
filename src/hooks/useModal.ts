import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [path, setPath] = useState<string>();
  const navigate = useNavigate();

  const openModal = (text: string, path?: string) => {
    setModalText(text);
    setPath(path);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (path) navigate(path);
  };

  return { isModalOpen, modalText, openModal, closeModal };
};
