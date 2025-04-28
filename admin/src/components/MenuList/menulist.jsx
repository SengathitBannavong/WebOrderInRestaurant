import React from 'react'
import './menulist.css'

const List = () => {
    // Sample data - in a real implementation, this would come from an API
    const sampleList = [
        { id: 1, name: 'Burger', category: 'Fast Food', price: 9.99, image: 'burger.jpg' },
        { id: 2, name: 'Pizza', category: 'Italian', price: 12.99, image: 'pizza.jpg' }
    ];
    
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
                
                {/* 
                    TODO for future developers:
                    - Implement axios to fetch actual data from backend
                    - Add state management using useState for the list
                    - Implement removeFood function to delete items
                    - Add proper error handling
                    - Connect to the correct API endpoints
                */}
                
                {sampleList.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        {/* Replace with actual image path in implementation */}
                        <img src={`/sample-images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List
