import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Chatbot from './Chatbot'
import { ScrollTo } from "react-scroll-to";


class Home extends Component {
  render() {

    const { plants, query } = this.props;
    return (
      <>
        {
          <header className="text-center pt-5 pb-5 headerImg">
            <div className="row my-5">
              <div className="col-6 offset-3 my-5 borderAround">
                <h2 className="pt-4 mt-5 mb-2"> JungleSwap </h2>
                <h5 className="mt-3 mb-5"> Share your green heart </h5>
                <div className="mb-5">
                  <ScrollTo>
                    {
                      ({ scroll }) => (
                        <Link className="biggerFontSize" onClick={() => scroll({y: 820, smooth: true})}> Try it </Link>
                      )
                    }
                  </ScrollTo>
                </div>
              </div>
            </div>
          </header>
        }
        <Chatbot/>
        <section>
          <div className="container mt-5">
            <div className="mt-4 mb-3 pt-5">
              <h4> All Plants </h4>            
            </div>
            <div className="mb-4">
              <input className="smallWidth" type="text" placeholder="Search..." value={ query } onChange={ this.props.onSearch }/>
            </div>
            <div className="row align-items-end container-fluid">
            {
              plants.map(
                (plant) => {
                  return (
                    <div className="col " key={plant._id}>
                      <Link to={ `/plants/${ plant._id }` }>
                        <img className="smallPicSize" src={ plant.image } alt={ plant.name }/>
                      </Link>
                      <div className="mt-2 mb-4"> <span> { plant.name } </span> </div>
                    </div>
                  );
                } 
              )
            }
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;