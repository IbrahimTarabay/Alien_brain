import React from 'react';
import Tilt from 'react-tilt';
import alien from './alien.png';
import './Logo.css';

const Logo = () => {
  return (
	  <div className='ma4 mt0'>
	   <Tilt className="Tilt br1" options={{ max : 65 }} style={{ height:200, width: 250 }} >
	    <div className="Tilt-inner pa1">
	     <img alt="alien" src={alien}/>
	      </div>
	       </Tilt>
	        </div>
  	);
}

export default Logo;