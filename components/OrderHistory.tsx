import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

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

  function getTotal(items) {
    let total = 0;

    for (const item of items) {
      total +=
        (item.price_data.unit_amount / 100) * Number.parseInt(item.quantity);
    }

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(total);
  }

  if (!orders)
    return (
      <ClipLoader
        color={"#1e6cd9"}
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  return (
    <div className="max-2xl:overflow-x-scroll">
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
              <tr key={order._id}>
                <td>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </td>
                <td className="text-base">
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
                <td>CA${getTotal(order.line_items)}</td>
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
