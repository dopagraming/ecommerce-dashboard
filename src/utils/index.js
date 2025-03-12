import toast from 'react-hot-toast';
import api from '../lib/axios';

const DeleteOne = async (id, type) => {
  try {
    await api.delete(`/${type}/${id}`);
    toast.success("Document added successfully");
  } catch (error) {
    DisplayErrors(error)
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