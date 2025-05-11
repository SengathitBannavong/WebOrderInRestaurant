import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Editfood.css";

const EditFood = ({ id, url, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    
    const [image, setImage] = useState('unchanged');
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchFood() {
            try {
                const response = await axios.get(`${url}/api/food/getfood/${id}`);
                if (response.data.success) {
                    const foodData = response.data.data;
                    setFormData({
                        name: foodData.name || "",
                        description: foodData.description || "",
                        price: foodData.price || "",
                        category: foodData.category || "Salad"
                    });
                    setImagePreview(foodData.image || "");
                    console.log(formData);
                } else {
                    toast.error("Failed to load food data");
                }
            } catch (err) {
                console.error("Error fetching food:", err);
                toast.error("Error loading food details");
            } finally {
                setLoading(false);
            }
        }
        
        fetchFood();
    }, [id, url]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataObj = new FormData();
            formDataObj.append("id", id);
            formDataObj.append("name", formData.name);
            formDataObj.append("description", formData.description);
            formDataObj.append("price", formData.price);
            formDataObj.append("category", formData.category);
            
            // Only append image if a new one was selected
            if (image && image !== 'unchanged') {
                formDataObj.append("image", image);
            }
            
            const response = await axios.post(`${url}/api/food/edit`, formDataObj);
            
            if (response.data.success) {
                toast.success("Food item updated successfully");
                if (onSuccess) onSuccess(); // Close modal and refresh list
            } else {
                toast.error(response.data.message || "Failed to update food");
            }
        } catch (err) {
            console.error("Error updating food:", err);
            toast.error(err.response?.data?.message || "An error occurred");
        }
    };
    
    if (loading) return <div>Loading food details...</div>;
    
    return (
        <form onSubmit={handleSubmit} className="edit-food-form">
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            
            <div className="form-group">
                <label>Price</label>
                <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Category</label>
                <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            
            <div className="form-group">
                <label>Image</label>
                {imagePreview && (
                    <div className="image-preview">
                        <img 
                            src={image === 'unchanged' ? `${url}/images/${imagePreview}` : imagePreview} 
                            alt="Food preview" 
                        />
                    </div>
                )}
                <input 
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <small>Leave empty to keep current image</small>
            </div>
            
            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    Update Food Item
                </button>
            </div>
        </form>
    );
};

export default EditFood;