import React from 'react';

 const Results = ({ box }) => {

  return (
    
    <div className="left ma">
    <div className='white ml4'><h3>Age:{box.age-6}</h3>Prob:{box.ageProp}% 
    <div className='white ml2'><h3>Gender:{box.gender}</h3>Prob:{box.genderProp}% 
    <div className='white ml0 mb3'><h3>Culture:<br/>{box.culture}</h3>Prob:{box.cultureProp}%  
    </div>
   </div>
   </div> 
   </div>

  	);
}


export default Results;