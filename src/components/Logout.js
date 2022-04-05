import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Logout(props) {
    let history = useHistory();
    useEffect(() => {   
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        history.push({
            pathname: props.location.state,
            state: history?.location?.pathname
          });
          window.location.reload()
    }, []);
    return (
        <div>
            
        </div>
    )
}

export default Logout;