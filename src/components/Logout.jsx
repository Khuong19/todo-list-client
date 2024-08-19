import React from 'react';

function Logout() {

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token from localStorage
        //reload the window
        window.location.reload();
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
}

export default Logout;
