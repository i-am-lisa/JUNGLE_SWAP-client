import React, { Component } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import config from './config'
import axios from 'axios';
import Home from './components/Home'
import NavBar from './components/NavBar';




class App extends Component {

  state = {
    loggedInUser: null,
    error: null,
  }

   // Make sure all the initial data that you show to the user is fetched here
   componentDidMount(){
    // axios.get(`${config.API_URL}/`)
    //   .then((response) => {
    //     console.log(response.data)
    //     // this.setState({ todos: response.data})
    //   })
    //   .catch(() => {
    //     console.log('Fetching failed')
    //   })

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

  render() {

    const {loggedInUser, error} = this.state

    return (
      <div>
        <NavBar onLogout={this.handleLogout} user={loggedInUser}/>
      <h1>Jungle Swap</h1>
       <Switch>
            <Route exact path="/" render={() => {
                return <Home />
            }} /> 
            
            <Route  path="/signin"  render={(routeProps) => {
              return  <SignIn onSignIn={this.handleSignIn} {...routeProps}  />
            }}/>
            <Route  path="/signup"  render={(routeProps) => {
              return  <SignUp error={error} onSignUp={this.handleSignUp} {...routeProps}  />
            }}/>
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App);