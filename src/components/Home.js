import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Home extends Component {


    render() {
        const {plants} = this.props

        return (
            <div>
            <header class="headerImg">
            <div><h1>JungleSwap</h1></div>
            </header>
                <h3>Welcome Home</h3>
                {/* <AllPlants plants={plants}/> */}
                
                <h4>All Plants</h4>
                {
                    plants.map((plant) => {
                    return <div key={plant._id}>
                                <Link ><img src={plant.image} alt={plant.name} /></Link>
                                <div >{plant.name} </div>
                                <div >{plant.description} </div>
                                <div >{plant.location} </div>
                            </div>
                    
                    })
                }
        
      
            </div>
        )
    }
}

export default Home

