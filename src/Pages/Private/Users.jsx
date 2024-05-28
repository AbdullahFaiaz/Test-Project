import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hook/useAxiosSecure";


const Users = () => {


    const axiosSecure = useAxiosSecure()
    const {data: allUsers=[], refetch} = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }, enabled: !! localStorage.getItem('access-token')
    })
    
    const handleAdmin = (id) => {

        axiosSecure.patch(`/users/admin/${id}`,{
            role: 'admin'
        })
        .then(res=> {
            if(res.data.modifiedCount > 0){
                refetch();
            }
        })

        }

        const handleUser = (id) => {
     
            axiosSecure.patch(`/users/admin/${id}`,{
                role: 'user'
            })
            .then(res=> {
                if(res.data.modifiedCount > 0){
                    refetch();
                }
            })

            }

    return (
        <div className="pt-[6vw]">
            
            {
            allUsers.map(user => 
            <div className="flex gap-[1vw] items-center pl-[2vw] border my-1" key={user._id}>
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div> 
             

                {user?.role==='admin'?  <button onClick={()=>handleUser(user._id)} className="btn btn-success">Make User</button>: <button onClick={()=>handleAdmin(user._id)} className="btn btn-success">Make Admin</button>}
            
            </div>)
            }
        </div>
    );
};

export default Users;