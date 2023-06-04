import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type OrderType = {
  _id?: string;
  line_items?: Object[];
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  paid?: boolean;
  status?: string;
};

const OrderHistory = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    if (!session) return;
    axios.get("/api/customers?email=" + session.user.email).then((response) => {
      axios.post("/api/orders", { ids: response.data.orders }).then((res) => {
        setOrders(res.data);
      });
    });
  }, [session]);

  return (
    <div>
      {orders?.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <td className="pr-20">Date</td>
              <td className="pr-20">Products</td>
              <td className="pr-20">Total</td>
              <td className="pr-20">Status</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr>
                <td>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </td>
                <td>
                  {order.line_items.map((line_item: any) => (
                    <>
                      {line_item.price_data.product_data.name}{" "}
                      <span className="text-gray-700">
                        x{" " + line_item.quantity}
                      </span>
                      <br />
                    </>
                  ))}
                </td>
                <td>
                  {order.line_items?.map((line_item: any) => (
                    <>
                      CA$
                      {(line_item.price_data.unit_amount / 100) *
                        Number.parseInt(line_item.quantity)}
                    </>
                  ))}
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-xl">You have no past orders</div>
      )}
    </div>
  );
};

export default OrderHistory;
