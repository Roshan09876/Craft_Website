import { createContext, useState } from "react";
import { getProductApi } from "../api/Api";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [product, setProduct] = useState([]); 

    const getallProduct = async () => {
        try {
            const response = await getProductApi();
            if(response.status === 200 || response.status === 201){
                console.log(response.data.allProducts)
                // console.log(response.data)
                setProduct(response.data.allProducts)  
            }
        } catch (error) {
            console.log(`Error in fetching product ${error}`)
            throw error;
        }
    }

    return (
        <ProductContext.Provider value={{ product, getallProduct }} >
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider };
export default ProductContext;
