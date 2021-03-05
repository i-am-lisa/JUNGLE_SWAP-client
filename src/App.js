import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Switch, withRouter } from 'react-router-dom';
import config from './config';
import axios from 'axios';
import Home from './components/Home';
import NavBar from './components/NavBar';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import PlantDetail from './components/PlantDetail'
import CheckoutPage from './components/CheckoutPage'
import LogOut from './components/LogOut';




class App extends Component {

  state = {
    loggedInUser: null,
    error: null,
    plants: [],
    query: ""
  }

   // Make sure all the initial data that you show to the user is fetched here
   componentDidMount(){
    this.fetchAllPlants()

    if (!this.state.loggedInUser) {
      axios.get(`${config.API_URL}/api/user`, {withCredentials: true})
        .then((response) => {
            this.setState({
              loggedInUser: response.data
            })
        })
        .catch(() => {

        })
    }  
  }

  fetchAllPlants = () => {
    axios.get(`${config.API_URL}/api/plants`)
      .then((response) => {
        this.setState({ plants: response.data})
      })
      .catch((err) => {
        console.log('Fetching failed', err)
      })
  }

  fetchQueryPlants = () => {
    console.log('fetchQueryPlants', this.state.query)
    console.log("running")
    axios
      .get(`${config.API_URL}/api/plants/search?q=${this.state.query}`)
      .then((response) => {
        this.setState({
          plants: response.data,
          ready: true
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    const query = e.target.value
    this.setState({ query }, () => {
      query ? this.fetchQueryPlants() : this.fetchAllPlants()
    })
    
  }

  //------------Add Form------------------

handleSubmit = (event) => {
  event.preventDefault()
  let name = event.target.name.value
  let description = event.target.description.value
  let size = event.target.size.value
  let image = event.target.plantImage.files[0]
  let location = event.target.location.value
  // console.log(image)

  let uploadForm = new FormData()
  uploadForm.append('imageUrl', image)

  axios.post(`${config.API_URL}/api/upload`, uploadForm)
    .then((response) => {
      //1. Make an API call to the server side Route to create a new plant
      const newPlant = {
        name: name,
        description: description,
        size: size,
        image: response.data.image,
        location: location,
      }
      // console.log("newPlant" + newPlant)

          axios.post(`${config.API_URL}/api/plants/create`, newPlant, {withCredentials: true})
            .then((response) => {
                // 2. Once the server has successfully created a new plant, update your state that is visible to the user
                this.setState({
                  plants: [response.data, ...this.state.plants]
                }, () => {
                  //3. Once the state is update, redirect the user to the home page
                  this.props.history.push('/')
                })

    })
    .catch((err) => {
      console.log('Create failed', err)
    })

    })

    .catch(() => {
      
    })


  
}


  //------------Edit Form------------------

handleEditPlant = (plant) => {
  axios.patch(`${config.API_URL}/api/plants/${plant._id}`, {
    name: plant.name,
    description: plant.description,
    size: plant.size,
    image: plant.image,
    location: plant.location,
  })
    .then(() => {
        let newPlants = this.state.plants.map((singlePlant) => {
            if (plant._id === singlePlant._id) {
              singlePlant.name  = plant.name
              singlePlant.description = plant.description
              singlePlant.size = plant.size
              singlePlant.image = plant.image
              singlePlant.location = plant.location
            }
            return singlePlant
        })
        this.setState({
          plants: newPlants
        }, () => {
          this.props.history.push('/')
        })

        
    })
    .catch((err) => {
      console.log('Edit failed', err)
    })

}

 //--------------Delete Plant------------------


 handleDelete = (plantId) => {

  //1. Make an API call to the server side Route to delete that specific plant
    axios.delete(`${config.API_URL}/api/plants/${plantId}`)
      .then(() => {
         // 2. Once the server has successfully created a new plant, update your state that is visible to the user
          let filteredPlants = this.state.plants.filter((plant) => {
            return plant._id !== plantId
          })

          this.setState({
            plants: filteredPlants
          }, () => {
            this.props.history.push('/')
          })
      })
      .catch((err) => {
        console.log('Delete failed', err)
      })

 }

// --------- Authentication------------


  handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    } 

    axios.post(`${config.API_URL}/api/signup`, user)
      .then((response) => {
          this.setState({
            loggedInUser: response.data
          }, () => {
            this.props.history.push('/')
          })
      })
      .catch((err) => {
          this.setState({
            error: err.data
          })
      })
 }

 handleSignIn = (event) => {
  event.preventDefault()
  let user = {
    email: event.target.email.value,
    password: event.target.password.value
  } 

  axios.post(`${config.API_URL}/api/signin`, user, {withCredentials: true})
    .then((response) => {
        this.setState({
          loggedInUser: response.data
        }, () => {
          this.props.history.push('/')
        })
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })
 }

 handleLogOut = () => {
  
  axios.post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
  .then(() => {
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
  })

 }

 handleCheckout = () => {
  
  axios.post(`${config.API_URL}/api/create-payment-intent`, {}, {withCredentials: true})
  .then(() => {
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
  })

 }



//--------------Render------------------

  render() {

    const {plants, loggedInUser, error, query} = this.state
    console.log('Query: ', query)
    return (
      <div>
        <NavBar onLogOut={this.handleLogOut} user={loggedInUser}/>
       <Switch>
            <Route exact path="/" render={() => {
                return <Home plants={plants} query={query} onSearch={this.handleChange}/>
            }} />   
            <Route  path="/plants/:plantId" render={(routeProps) => {
                return <PlantDetail  user={loggedInUser} onDelete={this.handleDelete} {...routeProps} />
            }} />
            <Route  path="/signin"  render={(routeProps) => {
              return  <SignIn onSignIn={this.handleSignIn} {...routeProps}  />
            }}/>
            <Route  path="/signup"  render={(routeProps) => {
              return  <SignUp error={error} onSignUp={this.handleSignUp} {...routeProps}  />
            }}/>
            <Route path="/add-form" render={() => {
                return <AddForm user={loggedInUser} onAdd={this.handleSubmit} />
            }} />
             <Route  path="/plant/:plantId/edit" render={(routeProps) => {
                return <EditForm onEdit={this.handleEditPlant} {...routeProps}/>
            }} />
            <Route  path="/plant/:plantId/checkout" render={(routeProps) => {
                return <CheckoutPage onCheckout={this.handleCheckout} {...routeProps}/>
            }} />
            <Route  path="/logout"  render={(routeProps) => {
              return  <LogOut onLogOut={this.handleLogOut} {...routeProps}  />
            }}/>
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App);