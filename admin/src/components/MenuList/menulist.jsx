import {useState, useEffect} from 'react'
import './menulist.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import EditFood from '../EditFood/EditFood'; // Import the EditFood component

const List = ({url}) => {
    const [list, setList] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFoodId, setEditFoodId] = useState(null);
    
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success){
            setList(response.data.data)
        }
        else{
            toast.error(response.data.message);
        }
    }

    const removeFood = async(foodId) =>{
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
        await fetchList();
        if (response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message);
        }
    }

    const editFood = (foodId) => {
        setEditFoodId(foodId);
        setIsEditModalOpen(true);
    }
    
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditFoodId(null);
        // Refresh the food list after edit
        fetchList();
    }

    useEffect(()=>{
        fetchList();
    },[])
    
    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item,index)=>{
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/`+item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <div className="food-actions">
                                <p onClick={()=>editFood(item._id)} className='cursor edit-icon'>✏️</p>
                                <p onClick={()=>removeFood(item._id)} className='cursor delete-icon'>❌</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Edit Food Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Edit Food Item</h2>
                            <button 
                                className="close-modal-btn" 
                                onClick={closeEditModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <EditFood 
                                id={editFoodId} 
                                onSuccess={closeEditModal}
                                url={url}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default List