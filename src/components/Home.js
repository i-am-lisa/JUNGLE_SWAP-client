import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Chatbot from './Chatbot'


class Home extends Component {


    render() {
        const {plants, query} = this.props
        console.log('Query in Home ', query)

        return (
            <div>
            <header className="headerImg">
            <div><h1>JungleSwap</h1></div>
            </header>
                <h3>Welcome Home</h3>
                <Chatbot/>
               
                
                {/* <AllPlants plants={plants}/> */}
                

                <h4>All Plants</h4>
                <h3>Search for Plants</h3>
                <label>Name:</label>
                <input type="text" value={query} onChange={this.props.onSearch}/> 
                <label>Location:</label>
                <select name="location" type="text" placeholder="Select">
                    <option>Select location</option>
                    <option value="sun">sun</option>
                    <option value="shade">shade</option>
                    <option value="sun and shade">sun and shade</option>
                </select>               
                {
                    plants.map((plant) => {
                    return <div key={plant._id}>
                                <Link to={`/plants/${plant._id}`}><img src={plant.image} alt={plant.name} /></Link>
                                <div >{plant.name} </div>
                            </div>
                    
                    })
                }
                
        
            <div id="allPlants">test</div>
            </div>
        )
    }
}

export default Home

