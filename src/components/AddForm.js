import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'


class AddForm extends Component {

  render() {
    const {user} = this.props

    if(!user){
      return <Redirect to={'/signin'}/>
    }
    return (
      <form onSubmit={this.props.onAdd}>
        <input name="name" type="text" placeholder="Enter name"/>
        <input name="description" type="text" placeholder="Enter desc"/>
        <input name="size" type="number" min="1" placeholder="size in cm"/>cm

        <select name="location" type="text" placeholder="Select">
            <option>Select location</option>
            <option value="sun">sun</option>
            <option value="shade">shade</option>
            <option value="sun and shade">sun and shade</option>
        </select>

        <input name="plantImage" type="file"/>
        <button type="submit" >Submit</button>
      </form>
    )
  }
}


export default AddForm