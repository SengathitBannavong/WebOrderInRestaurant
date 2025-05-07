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