import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import AddSubCategoryModal from "../components/models/AddSubCategoryModal";
import { useState } from "react";
import DeleteConfirmationModal from "../components/models/DeleteConfirmationModal";
import useModalState from "../hooks/useModalState";
import useGetItmes from "../hooks/useGetProducts";

export default function SubCategories() {
  const {
    isOpen,
    selectedItem,
    isEditMode,
    isDeleteModalOpen,
    onClose,
    handleEdit,
    handleDelete,
    handleAdd,
  } = useModalState();
  const { data, isLoading, error, refetch } = useGetItmes("subcategories");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sub Categories
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            onClick={() => handleAdd()}
          >
            Add Sub Category
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((subCategory) => (
                  <>
                    <tr key={subCategory.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {subCategory.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {subCategory.category.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          onClick={() => handleEdit(subCategory)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(subCategory)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        model="subcategories"
        message="Are you sure you want to delete this subcategory? This action cannot be undone."
        doc={selectedItem}
        refetch={refetch}
      />
      <AddSubCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        subcategory={selectedItem}
        isEditMode={isEditMode}
      />
    </div>
  );
}
