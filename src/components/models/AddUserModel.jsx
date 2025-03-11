import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { api } from "../../lib/axios";
import { DisplayErrors } from "../../utils/index";
export default function AddUserModel({
  isOpen,
  onClose,
  onSuccess,
  refetch,
  isEditMode,
  user,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      if (user && isEditMode) {
        await api.put(`/users/${user._id}`, data);
        toast.success("Subcategory updated successfully");
      } else {
        await api.post("/users", data);
        toast.success("Subcategory added successfully");
      }
      reset();
      onSuccess?.();
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      DisplayErrors(error);
    }
  };
  const roles = ["user", "admin", "manager"];
  useEffect(() => {
    if (isEditMode && user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("password", user.password);
      setValue("passwordConfirm", user.password);
    } else {
      reset();
    }
  }, [user, isEditMode, setValue, reset]);
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
                      {isEditMode ? "Update user" : "Add new user"}
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
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Email required",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div
                      //  className={`${isEditMode ? "hidden" : ""}`}
                      >
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          password
                        </label>
                        <input
                          type="password"
                          {...register("password", {
                            required: "password is required",
                            minLength: {
                              value: 6,
                              message: "password must be at least 6 characters",
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div
                      //  className={`${isEditMode ? "hidden" : ""}`}
                      >
                        <label
                          htmlFor="passwordconfirm"
                          className="block text-sm font-medium text-gray-700"
                        >
                          password Confirm
                        </label>
                        <input
                          type="password"
                          placeholder="password confirm"
                          {...register("passwordConfirm", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.passwordConfirm && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.passwordConfirm.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Roles
                        </label>
                        <select
                          {...register("role")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a role</option>
                          {roles?.map((role) => (
                            <option key={role.id} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.role.message}
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
                          ? "Updating..."
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
