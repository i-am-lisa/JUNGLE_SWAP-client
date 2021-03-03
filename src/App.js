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


class App extends Component {

  state = {
    loggedInUser: null,
    error: null,
    plants: []
  }

   // Make sure all the initial data that you show to the user is fetched here
   componentDidMount(){
    axios.get(`${config.API_URL}/api/plants`)
      .then((response) => {
        console.log('didmonut' + response.data)
        this.setState({ plants: response.data})
      })
      .catch(() => {
        console.log('Fetching failed')
      })

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

 handleLogout = () => {
  
  axios.post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
  .then(() => {
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
  })

 }

//------------Add Form------------------

handleSubmit = (event) => {
  event.preventDefault()
  let name = event.target.name.value
  let description = event.target.description.value
  let image = event.target.plantImage.files[0]
  let location = event.target.location.value
  console.log(image)

  let uploadForm = new FormData()
  uploadForm.append('imageUrl', image)

  axios.post(`${config.API_URL}/api/upload`, uploadForm)
    .then((response) => {
      //1. Make an API call to the server side Route to create a new plant
          axios.post(`${config.API_URL}/api/plants/create`, {
            name: name,
            description: description,
            image: response.data.image,
            location: location,
          })
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

//--------------Render------------------

  render() {

    const {plants, loggedInUser, error} = this.state

    return (
      <div>
        <NavBar onLogout={this.handleLogout} user={loggedInUser}/>
       <Switch>
            <Route exact path="/" render={() => {
                return <Home plants={plants}/>
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
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App);