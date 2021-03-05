import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

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
                
                {/* <AllPlants plants={plants}/> */}
                

                <h4>All Plants</h4>
                <label>Search for Plants</label>
                <input type="text" value={query} onChange={this.props.onSearch}/>                
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

