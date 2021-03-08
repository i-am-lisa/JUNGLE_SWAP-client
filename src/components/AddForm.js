import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AddForm extends Component {
  render() {
    const {user} = this.props

    if(!user){
      return <Redirect to={'/signup'}/>
    }
    return (
      <div className="container row mt-5">
        <div className="mt-5 col-11 col-md-5 offset-1 offset-md-5">
          <h4 className="mt-5 mb-5"> Add a your plant </h4>
          <form onSubmit={ this.props.onAdd }>
            <input className="mb-4" name="name" type="text" placeholder="Enter name"/>
            <input className="mb-4" name="description" type="text" placeholder="Enter description"/>
            <input className="mb-4 smallWidth" name="size" type="number" min="1" placeholder="Size"/> cm <br/>
            <select className="mb-4 p-1" name="location" type="text">
              <option> Select location </option>
              <option value="sun"> sun </option>
              <option value="shade"> shade </option>
              <option value="sun and shade"> sun and shade </option>
            </select>
            <input className="mb-4" name="plantImage" type="file"/>
            <button className="btn btn-sm" type="submit" > Add plant </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddForm;