import axios from "axios";

export const fetchOrders = async (url) => {
    const response = await axios.get(`${url}/api/order/list`);
    if(response.data.success) {
        return response.data.data;
    }else {
        console.log("Error fetching order list");
        return [];
    }
}

export const fetchOrderById = async (url, id) => {
    const response = await axios.get(`${url}/api/order/${id}`);
    if(response.data.success) {
        return response.data.data;
    }else {
        console.log("Error fetching order by id");
        return null;
    }
}

export const removeOrderById = async (url, id) => {
    const response = await axios.delete(`${url}/api/order/remove/${id}`);
    if(response.data.success) {
        return response.data.data;
    }else {
        console.log("Error deleting order by id");
        return null;
    }
}