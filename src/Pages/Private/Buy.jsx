import { useParams } from "react-router-dom";
import useAllProducts from "../../Hook/useAllProducts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');



const Buy = () => {
    const {id} = useParams()
    const [allProducts, refetch] = useAllProducts()
    const thisProduct = allProducts.filter(product => product._id === id)

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm id={id} price={thisProduct[0].price}></CheckOutForm>
            </Elements>
            {/* Price is {thisProduct[0].price} */}
            
        </div>
    );
};

export default Buy;