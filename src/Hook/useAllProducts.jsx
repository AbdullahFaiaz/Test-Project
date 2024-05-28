import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllProducts = () => {
    const axiosSecure = useAxiosSecure()
    const {data: allProducts= [], refetch} = useQuery({ 
        queryKey: ['allPro'],
        queryFn: async () => {
            const res = await axiosSecure.get("/allProducts")
            return res.data
            // const res = await fetch("http://localhost:5000/allProducts")
            // return res
        }, enabled: !! localStorage.getItem('access-token')
        
        })
        return [allProducts,refetch]

};

export default useAllProducts;