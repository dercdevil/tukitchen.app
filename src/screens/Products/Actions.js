import { useCart, useProducts, useCategories, useSellers } from "@/hooks";


const ProductsActions = ({ navigation }) => {

    const products = useProducts();
    const cart = useCart();
    const categories = useCategories();
    const sellers = useSellers();

    return {
        sellers,
        products,
        cart,
        categories
    }

}

export default ProductsActions;