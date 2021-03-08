import React, { Component, createRef } from "react";
import { Link, Redirect } from "react-router-dom";
import config from "../config";
import axios from "axios";

class PlantDetail extends Component {

  state = {
    plant: {}
  }

  componentDidMount() {
    let plantId = this.props.match.params.plantId;
    axios.get(
      `${ config.API_URL }/api/plants/${ plantId }`, 
      { withCredentials: true }
    )
      .then(
        (response) => {
          this.setState({ plant: response.data });
        }
      )
      .catch(
        () => {
          console.log("Detail fetch failed");
        }
      );
  }

  render() {
    const { plant } = this.state;
    const { onDelete, user } = this.props;
    if (!user) {
      return <Redirect to={ "/signin" }/>
    }
    return (
      <div className="container mt-5 row row-md-10 offset-1 offset-md-4">
        <div className="mt-4 mb-3 pt-4 container">
          <h4> Plant details </h4>            
        </div>
        <div className="col">
          {
            plant.image ? (
              <img className="bigPicSize" src={ plant.image } alt={ plant.name } />
            ) : (
            null
            )
          }
          <div className="mt-2"> <span> Name: </span> { plant.name } </div>
          <div className="mt-2"> <span> Description: </span> { plant.description } </div>
          <div className="mt-2"> <span> Size: </span> { plant.size } cm </div>
          <div className="mt-2"> <span> Likes: </span> { plant.location } </div>
          <div className="mt-3 col justify-content-center">
            <div className="row-2 justify-content-center">
              {
                (user._id === plant.creator) ? (
                  <>
                    <Link to={ `/plant/${ plant._id }/edit` }> <button className="btn btn-sm ml-2"> Edit </button> </Link>
                    <button className="btn btn-sm ml-2" 
                      onClick={
                        () => {
                          onDelete(plant._id); 
                        }
                      }
                    > Delete </button>
                  </>
                ) : ( 
                  <>
                    <Link to={ `/plant/${ plant._id }/checkout` }> <button className="btn btn-sm ml-2"> Buy </button> </Link>
                    <button className="btn btn-sm ml-2"> Swap </button>
                  </>
                )
              }
              <Link to={ "/" }> <button className="btn btn-sm ml-2"> Go back </button> </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlantDetail;
