import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
  refetch,
  product,
  isEditMode,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data;
    },
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get("/brands");
      return response.data.data;
    },
  });

  const { data: subcategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const response = await api.get("/subcategories");
      return response.data.data;
    },
  });
  const cleanData = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => {
        return (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0) &&
          !(typeof value === "number" && isNaN(value))
        );
      })
    );
  };
  const onSubmit = async (data) => {
    const cleanedData = cleanData(data);
    try {
      if (product && isEditMode) {
        await api.put(`/products/${product._id}`, cleanedData);
        toast.success("Product added successfully");
      } else {
        await api.post("/products", cleanedData);
        toast.success("Product added successfully");
      }
      refetch();
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {}
  };
  useEffect(() => {
    console.log(product);
    if (isEditMode && product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("quantity", product.quantity);
      setValue("price", product.price);
      setValue("imageCover", product.imageCover);
    } else {
      reset();
    }
  }, [product, isEditMode, setValue, reset]);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {isEditMode ? "Edit Product" : "Add Product"}
                    </Dialog.Title>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "Title is required",
                            minLength: {
                              value: 2,
                              message: "Title must be at least 2 characters",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          {...register("description", {
                            required: "Description is required",
                            maxLength: {
                              value: 200,
                              message:
                                "Description must be less than 200 characters",
                            },
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.description.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            {...register("quantity", {
                              required: "Quantity is required",
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.quantity && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.quantity.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="sold"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sold (optional)
                          </label>
                          <input
                            type="number"
                            {...register("sold", { valueAsNumber: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            {...register("price", {
                              required: "Price is required",
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.price && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.price.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="priceAfterDiscount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price After Discount (optional)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            {...register("priceAfterDiscount", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="color"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Color (optional)
                        </label>
                        <input
                          type="text"
                          {...register("color")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="images"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Images URLs (optional, comma-separated)
                        </label>
                        <input
                          type="text"
                          {...register("images")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="imageCover"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cover Image URL
                        </label>
                        <input
                          type="text"
                          {...register("imageCover", {
                            required: "image cover is required",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="ratingsAverage"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rating Average (optional)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            {...register("ratingsAverage", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="ratingQuantity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rating Quantity (optional)
                          </label>
                          <input
                            type="number"
                            {...register("ratingQuantity", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: "Category is required",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a category</option>
                          {categories?.map((category) => (
                            <option key={category.id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.category.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="subcategories"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Subcategories (optional)
                        </label>
                        <select
                          multiple
                          {...register("subcategories")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {subcategories?.map((subcategory) => (
                            <option
                              key={subcategory.id}
                              value={subcategory._id}
                            >
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="brand"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Brand (optional)
                        </label>
                        <select
                          {...register("brand")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a brand</option>
                          {brands?.map((brand) => (
                            <option key={brand.id} value={brand._id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting
                        ? isEditMode
                          ? "Editing"
                          : "Adding..."
                        : isEditMode
                        ? "Edit"
                        : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg- md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
