import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useState } from "react";
import DeleteConfirmationModal from "../components/models/DeleteConfirmationModal";
import useGetItmes from "../hooks/useGetProducts";

export default function Reviews() {
  const [isDeleteModelOpen, setIsDleteModelOpen] = useState(false);
  const onClose = () => {
    setIsDleteModelOpen(false);
  };
  const { data, isLoading, error, refetch } = useGetItmes("reviews");

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
          <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    User
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Comment
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <></>
                {data?.map((review) => (
                  <>
                    <tr key={review._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {review?.user ? review?.user : "ahmet"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {review.product}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`h-5 w-5 ${
                                  index < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-500">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-md">
                        <div className="truncate">{review.title}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setIsDleteModelOpen(true)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <DeleteConfirmationModal
                      isOpen={isDeleteModelOpen}
                      onClose={onClose}
                      title={review.name}
                      id={review._id}
                      model={"reviews"}
                      message={`Are you sure you want to delete this review`}
                      refetch={refetch}
                    />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
