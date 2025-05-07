import axios from "axios";

export const fetchTableList = async (url) => {
    const response = await axios.get(`${url}/api/table/list`);
    if(response.data.success) {
        return response.data.data;
    }else {
        console.log("Error fetching table list");
        return [];
    }
}