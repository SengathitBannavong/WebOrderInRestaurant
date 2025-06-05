import OrderQueue from '../components/OrderList/orderqueue.jsx';

const Orders = ({url}) => {
    return (
        <div className='add'>
            <OrderQueue url={url} />
        </div>
    );
};

export default Orders;