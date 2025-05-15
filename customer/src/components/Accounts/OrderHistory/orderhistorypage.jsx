import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderHistory from "./orderhistory";
import { Spinner, Alert } from "react-bootstrap";

const OrderHistoryPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("User ID not provided.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        // Fetch API from user IDID
        const response = await axios.get(`/api/orders/${userId}`);
        if (response.data.success) {
          // Format datadata
          const formattedOrders = response.data.data.map((order) => ({
            id: order._id,
            date: order.date,
            status: order.status,
            items: order.items.map((item) => ({
              name: item.name || "Unnamed Item",
              quantity: item.quantity || 1,
              price: item.price || 0,
            })),
            total: order.amount,
          }));
          setOrders(formattedOrders);
        } else {
          setError("Failed to fetch orders from server.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <OrderHistory
      orders={orders}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default OrderHistoryPage;
