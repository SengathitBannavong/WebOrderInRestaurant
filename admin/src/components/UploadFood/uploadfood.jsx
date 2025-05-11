import { useState } from 'react';
import { assets } from '../../assets/assets';
import './uploadfood.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = ({url}) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Salad',
    });

    const onChangeHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData);

        if (response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    
    return (
        <form className='flex-col' onSubmit={onSubmitHandler}>
            {/* Image Upload Section */}
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image"  style={{width:"125px"}}>
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            
            {/* Product Name Input */}
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandle} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            
            {/* Product Description Input */}
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandle} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            
            {/* Category and Price Section */}
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandle} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    {/* Additional categories can be added here */}
                    </select>
                </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandle} value={data.price} type="number" name='price' placeholder='$20' />
            </div>
            </div>
            {/* Submit Button */}
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    )
}

export default Add
