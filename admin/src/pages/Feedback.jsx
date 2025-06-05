import React from 'react';
import FeedbackList from '../components/Feedback/FeedbackList.jsx';

const Feedback = ({url}) => {
    return (
        <div className='add'>
            <FeedbackList url={url} />
        </div>
    );
};

export default Feedback;