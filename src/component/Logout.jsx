import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("You are logging out...");
    setTimeout(() => {
      navigate('/l');
    }, 2000); 
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '5px',
        height: '100vh',
        color: 'white', // ✅ White text
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        flexDirection: 'column',
      }}
    >
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;




