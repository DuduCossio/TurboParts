import { OrdersTable } from "../components/pedidos/OrdersTable";
import { LayoutsAdmin } from "../layouts/layoutsAdmin"

export function Orders(){
    return(
        <>
        <div className=" grid grid-cols-[300px_1fr]">
            <LayoutsAdmin/>
            <OrdersTable/>
        </div>
        </>
    )
}