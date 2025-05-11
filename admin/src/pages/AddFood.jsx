import React, {useState} from 'react';
import UploadFood from '../components/UploadFood/uploadfood.jsx';

const AddFood = ({url}) => {
    
    return (
        <div className='add'>
            <UploadFood url={url} />
        </div>
    );
};

export default AddFood;