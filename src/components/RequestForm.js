import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class RequestForm extends Component {
  render() {
    /*const { user } = this.props
    if (!user) {
      return <Redirect to={"/signup"} />
    }*/
    const { plant } = this.props.location;
    return (
      <div className="container row mt-5">
        <div className="mt-5 col-11 col-md-5 offset-1 offset-md-5">
          <h4 className="mt-5 mb-5"> Your mesage </h4>
          <form onSubmit={(event) => this.props.onRequest(event, plant) }>
            <div>
              <textarea className="mb-4" name="message" cols="35" rows="4"/>
            </div>
            <button className="btn btn-sm" type="submit"> Send </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RequestForm;