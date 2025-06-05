import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderlist.css";

const OrderQueue = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrdersByStatus = async () => {
        try {
            const response = await axios.get("/api/order/status/Pending");
            setOrders(response.data.data);
        } catch (err) {
            setError("Không thể tải danh sách đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdersByStatus();
    }, []);

    if (loading) return <p>Đang tải đơn hàng...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="order-queue">
            <h3>Đơn hàng đang chờ xử lý</h3>
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Người đặt</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId}</td>
                            <td>{order.items.map(item => `${item.name} x${item.quantity}`).join(", ")}</td>
                            <td>${order.amount}</td>
                            <td>{new Date(order.date).toLocaleString()}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderQueue;
