import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
    setIsEditMode(false);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleSuccess = (model) => {
    QueryClient.invalidateQueries([`${model}`]);
  };
  return {
    isOpen,
    selectedItem,
    isEditMode,
    isDeleteModalOpen,
    onClose,
    handleEdit,
    handleDelete,
    handleAdd,
    handleSuccess,
  };
};

export default useModalState;
