import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Results from './components/Results/Results';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions ={
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 600
      }
    }
  }
}

const initialState ={
        input: '',
        imageUrl:'',
        box:{},
        results:{},
        route: 'signin',
        isSignedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }  
    }

class App extends Component {
	constructor(){
		super();
		this.state = initialState;
	}

  loadUser = (data) => {
    this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
    }})
  }

	calculateFaceLocation = (data) => {
       /*bounding box on face*/
       const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);

       return{   
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
       }
	}

 calculateDemographics = (data) =>{
    /*Demographics predictions*/
     const common = data.outputs[0].data.regions[0].data.face;  
     const age = common.age_appearance.concepts[0].name;
     const ageProp = Math.round((common.age_appearance.concepts[0].value)*100);
     const gender = common.gender_appearance.concepts[0].name;
     const genderProp = Math.round((common.gender_appearance.concepts[0].value)*100);
     const culture = common.multicultural_appearance.concepts[0].name;
     const cultureProp = Math.round((common.multicultural_appearance.concepts[0].value)*100);
      
      return{
        age: age,
        ageProp: ageProp,
        gender: gender,
        genderProp: genderProp,
        culture: culture,
        cultureProp: cultureProp
   }
 }

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

  displayResults = (results) => {
    this.setState({results:results});
  }

	onInputChange = (event) => {      
    this.setState({input:event.target.value});
	}

	onButtonSubmit = () =>{
   const {input,user} = this.state;

    this.setState({imageUrl: input});
      fetch('https://mysterious-anchorage-73792.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
        input:input
        })
      })
        .then(response => response.json())
    		.then(response => {
          if (response) {
            fetch('https://mysterious-anchorage-73792.herokuapp.com/image',{
              method: 'put',
              headers: {'Content-Type':'application/json'},
              body:JSON.stringify({
                id:user.id
              })
        })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(user,{entries: count}));
          })
          .catch(console.log)
        }
         this.displayResults(this.calculateDemographics(response));
         this.displayFaceBox(this.calculateFaceLocation(response)); 
      })
        .catch(err => console.log(err));  
	}

  //Dynamically set our route
  onRouteChange = (route) => {
   	if (route === 'signout') {
   		this.setState(initialState);
   	} else if (route === 'home') {
   		this.setState({isSignedIn: true});
   	}
   	this.setState({route: route});
   }

  render() {
    //Destructuring so we don't use this.state repeatedly
    const {isSignedIn,imageUrl,route,box,user,results} = this.state;
    return (
         <div className="App">
          <Particles className='particles'  params={particlesOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
	      ? <div> 
	         <Logo />
           <ImageLinkForm
	         onInputChange={this.onInputChange}
	         onButtonSubmit={this.onButtonSubmit}
	         />
           <Rank name={user.name} entries={user.entries}/>
	         <FaceRecognition box={box} imageUrl={imageUrl} />      
	         <Results results={results} /> 
	         </div>
          : (
              route === 'signin'
               ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
               : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          	)
         } 
      </div>
    );
  }
}

export default App;