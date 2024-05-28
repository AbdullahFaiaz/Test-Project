import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";



const useMyProducts = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const {data: myProducts= [], refetch} = useQuery({ 
        queryKey: ['myPro'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myProducts?email=${user.email}`)
            return res.data
            // const res = await fetch("http://localhost:5000/myProducts")
            // return res
        }, enabled: !! localStorage.getItem('access-token')
        
        })
        return [myProducts,refetch]

};

export default useMyProducts;