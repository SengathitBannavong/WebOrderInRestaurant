import React, { useState } from 'react'
import './uploadfood.css'
import { assets } from '../../assets/assets'


const Add = () => {
    // State for form data and image
    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'Salad',
        price: ''
    })
    const [image, setImage] = useState(null)
    
    // Handle form field changes
    const onChangeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    
    // Handle form submission
    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        // TODO: Add API integration for form submission
        // Example implementation:
        // const formData = new FormData()
        // formData.append('image', image)
        // formData.append('name', data.name)
        // formData.append('description', data.description)
        // formData.append('category', data.category)
        // formData.append('price', data.price)
        // axios.post('/api/food/add', formData)
        //   .then(res => {
        //     toast.success('Food item added successfully')
        //     // Reset form
        //   })
        //   .catch(err => {
        //     toast.error('Failed to add food item')
        //   })
        
        console.log("Form submitted:", data, image)
    }
    
    return (
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* Image Upload Section */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                
                {/* Product Name Input */}
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                
                {/* Product Description Input */}
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                
                {/* Category and Price Section */}
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            {/* Additional categories can be added here */}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                </div>
                
                {/* Submit Button */}
                <button type='submit' className='add-btn'>ADD</button>
            </form>
    )
}

export default Add
