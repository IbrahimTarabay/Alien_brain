import React from 'react';

 const Results = ({ results }) => {
  return (
    <div className="left ma">
    <div className='white ml4'><h3>Age:{results.age}</h3>Prob:{results.ageProp}% 
    <div className='white ml2'><h3>Gender:{results.gender}</h3>Prob:{results.genderProp}% 
    <div className='white ml0 mb3'><h3>Culture:<br/>{results.culture}</h3>Prob:{results.cultureProp}%  
    </div>
    </div>
    </div> 
    </div>
  	);
}

export default Results;