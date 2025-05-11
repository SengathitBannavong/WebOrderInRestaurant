import React from 'react';
import MenuList from '../components/MenuList/menulist.jsx';

const List = ({url}) => {
    return (
        <div className='add'>
            <MenuList url={url} />
        </div>
    );
};

export default List;