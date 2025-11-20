import { CategoriesTable } from "../components/categorias/CategoriesTable";
import { CategoryForm } from "../components/categorias/CategoryForm";
import { LayoutsAdmin } from "../layouts/layoutsAdmin"

export function Categorias(){
    return(
        <>
        <div className=" grid grid-cols-[300px_1fr]">
            <LayoutsAdmin/>
            <CategoryForm/>
        </div>
        </>
    )
}