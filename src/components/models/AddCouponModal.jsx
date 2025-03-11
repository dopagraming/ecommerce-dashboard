import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { api } from "../../lib/axios";
import { DisplayErrors } from "../../utils";

export default function AddCouponModal({
  isOpen,
  onClose,
  onSuccess,
  coupon,
  refetch,
  isEditMode,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (coupon && isEditMode) {
        await api.put(`/coupons/${coupon._id}`, data);
        toast.success("Coupon updated successfully");
      } else {
        await api.post("/coupons", data);
        toast.success("Coupon added successfully");
      }
      reset();
      onSuccess?.();
      refetch();
      onClose();
    } catch (error) {
      DisplayErrors(error);
    }
  };
  useEffect(() => {
    if (isEditMode && coupon) {
      setValue("name", coupon.name);
      setValue("discount", coupon.discount);
    } else {
      reset();
    }
  }, [coupon, isEditMode, setValue, reset]);
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
                      {isEditMode ? "Edit Coupon" : "Add Coupon"}
                    </Dialog.Title>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          {...register("name", {
                            required: "Code is required",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.code && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.code.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="discount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register("discount", {
                            required: "Discount is required",
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: "Discount cannot be negative",
                            },
                            max: {
                              value: 100,
                              message: "Discount cannot exceed 100%",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.discount && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.discount.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="expire"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="datetime-local"
                          {...register("expire", {
                            required: "Expiry date is required",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.expiryDate.message}
                          </p>
                        )}
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
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
