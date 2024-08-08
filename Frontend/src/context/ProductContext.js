import { createContext, useCallback, useState } from "react";
import { getProductApi, getProductByIDApi } from "../api/Api";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getallProduct = useCallback(async () => {
        try {
            const response = await getProductApi();
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.allProducts);
                setProduct(response.data.allProducts);
            }
        } catch (error) {
            console.log(`Error in fetching product ${error}`);
            throw error;
        }
    }, []);

    const getProductById = useCallback(async (id) => {
        try {
            const response = await getProductByIDApi(id);
            if (response.status === 200 || response.status === 201) {
                setSelectedProduct(response.data.product);
                return response.data.product;
            }
        } catch (error) {
            console.log(`Error in fetching product by ID ${error}`);
            throw error;
        }
    }, []);

    return (
        <ProductContext.Provider value={{ product, getallProduct, getProductById, selectedProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export { ProductContext, ProductProvider };
export default ProductContext;
