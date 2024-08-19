import React from 'react';

const TaskCountBubble = ({ count }) => {
return (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
    {count}
    <span className="visually-hidden">unread messages</span>
    </span>
);
};

export default TaskCountBubble;
