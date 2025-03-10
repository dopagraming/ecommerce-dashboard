import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { data } from "react-router-dom";

const fetchProducts = async () => {
    const response = await api.get("/products");
    console.log(response.data.data);
    return response.data;
}

const useGetProducts = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({ queryKey: ["products"], queryFn: fetchProducts })
    return {
        data, isLoading, error
    }
}