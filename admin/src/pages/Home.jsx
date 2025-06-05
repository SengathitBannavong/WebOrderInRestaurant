import DashBoard from '../components/DashBoard/dashboard.jsx';

const Home = ({url}) => {
    return (
        <div className='add'>
            <DashBoard url={url} />
        </div>
    );
};

export default Home;