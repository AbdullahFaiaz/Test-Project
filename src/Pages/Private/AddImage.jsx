import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'
import coolbg from "../../assets/cool-3.png"
import { useContext } from "react";
import { AuthContext } from "../../Context/ContextComponent";
import useAxiosSecure from './../../Hook/useAxiosSecure';
import useMyProducts from './../../Hook/useMyProducts';












const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddImage = () => {
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useMyProducts()
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const newProduct = {
                image: res.data.data.display_url,
                product_type: data.product_type,
                size: data.size,
                fabric: data.fabric,
                color: data.color,
                price: data.price,
                occasion: data.occasion,
                email: data.email,
                user_name: data.user_name
            };
            // 
            const productRes = await axiosSecure.post('/products', newProduct);
            console.log(productRes.data)
            if(productRes.data.insertedId){
                // show success popup
                refetch()
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.product_type} is Added.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log(res.data)
    }
    return (
        <div style={{ backgroundImage: `url(${coolbg})` }} className="bg-cover bg-center p-10 sm:p-24">
        <Helmet>
            <title>Adventure Avenue | Add Tourists Spot</title>
        </Helmet>
            <h2 className="text-3xl text-gray-700 font-extrabold">Add a Tourists Spot</h2>
        <form onSubmit={handleSubmit(onSubmit)}>



<div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>
            {/* Image URL */}
            <div className="mb-8">
                <div className="form-control w-full">
                <label className="label">
                        <span className="text-gray-700 label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input required placeholder="Image Upload"  className="input input-bordered w-full" type="file" {...register("image")} />
                    </label>
                </div>
            </div>

            {/* <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Image</span>
                    </label>
                    <label className="input-group">
                        <input type="file" name="imageFile" placeholder="Image" className="" />
                    </label>
                </div>
            </div> */}



            {/* Product type */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Product Type</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" {...register("product_type")} name="product_type" placeholder="Product Type" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* size */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Size</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register("size")} name="size" placeholder="Size" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* color */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Color</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register("color")} name="color" placeholder="Color" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Fabric */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Fabric</span>
                    </label>
                    <label className="input-group">
                        <input required type="Text" {...register("fabric")} name="fabric" placeholder="Fabric" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>


            <div className='w-full'>
            {/* Occasion*/}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Occasion</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register("occasion")} name="occasion" placeholder="Occasion" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Price */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Price</span>
                    </label>
                    <label className="input-group">
                        <input type="number" {...register("price")} name="price" placeholder="Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Email */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Email</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="email" {...register("email")} name="email" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Name */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="text" defaultValue={user.displayName} {...register("user_name")} name="user_name" placeholder="User Name" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>    
        </div>


            {/* Add Button */}

        <input value="Add" className="btn text-black btn-block bg-[#D4AF37]" type="submit" />
      </form>
      </div>
    );
};

export default AddImage;
