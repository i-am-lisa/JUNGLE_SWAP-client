import axios from 'axios'
import React, { Component, createRef } from 'react'
import config from '../config'
import {Link, Redirect} from 'react-router-dom'

export default class PlantDetail extends Component {

  state = {
    plant: {}
  }

  componentDidMount(){
    console.log(this.props) 
 
   let plantId = this.props.match.params.plantId
    axios.get(`${config.API_URL}/api/plants/${plantId}`, {withCredentials: true})
      .then((response) => {
        this.setState({ plant: response.data })
      })
      .catch(() => {
        console.log('Detail fetch failed')
      })
  }

  render() {
    const {plant} = this.state
    const {onDelete, user} = this.props
    console.log(this.props)

    if(!user){
      return <Redirect to={'/signin'}/>
    }

    console.log('---', user, plant)

    return (
      <div>
      
        <h4>Details are:</h4>
        {
            plant.image ? (
                <img src={plant.image} alt={plant.name} />
            ) : 0
        }
        <div>Name: {plant.name}</div>
        <div >{plant.description} </div>
        <div >Size: {plant.size} cm </div>
        <div >Likes: {plant.location} </div>

        {
            user._id === plant.creator ? (
              <>
                <Link to={`/plant/${plant._id}/edit`}>
                  <button>Edit</button>
                </Link>
              <button onClick={() => { onDelete(plant._id)  } }>Delete</button>
              </>
            ) : <>
                  <button>Buy</button>
                  <button>Swap</button>
              </>
        }

        
      </div>
    )
  }
}
