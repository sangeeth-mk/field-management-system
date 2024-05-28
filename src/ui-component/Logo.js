// material-ui
  
//  * if you want to use image instead of <svg> uncomment following.
 
  // import logoDark from 'assets/images/logo-dark.svg';
  import React from 'react';
  // import { useNavigate } from 'react-router-dom';
  import logo from 'assets/images/App Logo.png';
  

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/');
  // }
  
 
  return (
    <img style={{cursor:"pointer"}} src={logo} alt="FielDesk Go" height='50' width="50" />

   
  );
};

export default Logo;
