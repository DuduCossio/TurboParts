import { ProductForm } from "../components/products/ProductForm"
import { ProductsTable } from "../components/products/ProductsTable"
import { LayoutsAdmin } from "../layouts/layoutsAdmin"

export function Products(){
    return(
        <>
        <div className=" grid grid-cols-[300px_1fr]">
            <LayoutsAdmin/>
            <ProductForm/>
        </div>
        </>
    )
}