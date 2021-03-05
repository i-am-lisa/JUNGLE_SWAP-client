import axios from 'axios'
import React, { Component } from 'react'
import config from '../config'

export default class EditForm extends Component {

  state = {
    plant: {}
  }

  componentDidMount(){
    let plantId = this.props.match.params.plantId
    axios.get(`${config.API_URL}/api/plants/${plantId}`)
      .then((response) => {
        this.setState({
          plant: response.data
        })
      })
      .catch(() => {
        console.log('Detail fetch failed')
      })
  }

  handleNameChange = (event) => {
    let text = event.target.value
    // console.log(text)
    let clonePlant = JSON.parse(JSON.stringify(this.state.plant))
    clonePlant.name = text

    this.setState({
      plant: clonePlant
    })
  }

  handleDescChange = (event) => {
    let text = event.target.value
    let clonePlant = JSON.parse(JSON.stringify(this.state.plant))
    clonePlant.description = text

    this.setState({
      plant: clonePlant
    })
  }

  handleSizeChange = (event) => {
      let text = event.target.value
      let clonePlant = JSON.parse(JSON.stringify(this.state.plant))
      clonePlant.size = text
        // console.log('edit' + text)
        this.setState({
            plant: clonePlant
        })


    }

    handleLocationChange = (event) => {
        let text = event.target.value
        let clonePlant = JSON.parse(JSON.stringify(this.state.plant))
        clonePlant.location = text
          // console.log('edit' + text)
          this.setState({
              plant: clonePlant
          })
    }


    handleImageChange = (event) => {
        let text = event.target.value
        let clonePlant = JSON.parse(JSON.stringify(this.state.plant))
        clonePlant.image = text
          // console.log('edit' + text)
          this.setState({
              plant: clonePlant
          })
    }

  render() {
    const {plant} = this.state
    const {onEdit} = this.props

    return (
      <div>
          <input type="text" onChange={this.handleNameChange} value={plant.name}/>
          <input type="text" onChange={this.handleDescChange} value={plant.description}/>
          <input type="number" onChange={this.handleSizeChange} value={plant.size}/>
        <select onChange={this.handleLocationChange} name="location" type="text" placeholder="Select">
            <option value="sun">sun</option>
            <option value="shade">shade</option>
            <option value="sun and shade">sun and shade</option>
        </select>
          <input onChange={this.handleImageChange} type="text"  value={plant.image}/>
          <button onClick={ () => { onEdit(plant) } }  >Submit</button>
      </div>
    )
  }
}
