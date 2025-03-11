import toast from 'react-hot-toast';
import api from '../lib/axios';

const DeleteOne = async (id, type) => {
  try {
    const token = localStorage.getItem("token")
    const response = await api.delete(`/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Coupon added successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

export default DeleteOne;


const DisplayErrors = (error) => {
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((err) => {
        toast.error(err.msg || "Something went wrong");
      });
    } else if (typeof errors === "object" && errors.msg) {
      toast.error(errors.msg || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  } else {
    toast.error("Something went wrong");
  }
}

export { DeleteOne, DisplayErrors }