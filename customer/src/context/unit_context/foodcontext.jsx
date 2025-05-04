import axios from "axios";

export const fetchFoodList = async (url) => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
        return response.data.data;
    }else {
        console.log("Error fetching food list");
        return [];
    }
}
