import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { api } from "../lib/axios";
import AddBrandModal from "../components/models/AddBrandModal";
import DeleteConfirmationModal from "../components/models/DeleteConfirmationModal";

export default function Brands() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setIsEditMode(true);
    setIsOpen(true);
  };
  const handleDelete = (brand) => {
    selectedBrand(brand);
    setIsDeleteModalOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
    setSelectedBrand(null);
    setIsEditMode(false);
    setIsDeleteModalOpen(false);
  };
  const queryClient = useQueryClient();

  const {
    data: brands,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get("/brands");
      return response.data.data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch brands");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">⚠️ Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Add Brand
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
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {brands?.map((brand) => (
                  <>
                    <tr key={brand.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {brand.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(brand)}
                          className="text-red-600 hover:text-red-900"
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
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Brand"
        message="Are you sure you want to delete this brand? This action cannot be undone."
        model={"brands"}
        doc={selectedBrand}
        refetch={refetch}
      />
      <AddBrandModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => {
          queryClient.invalidateQueries(["brands"]);
          setIsOpen(false);
          setSelectedBrand(null);
          setIsEditMode(false);
        }}
        brand={selectedBrand}
        isEditMode={isEditMode}
      />
    </div>
  );
}
