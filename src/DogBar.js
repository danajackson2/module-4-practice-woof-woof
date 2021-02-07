import React from 'react'
import DogButton from './DogButton'

class DogBar extends React.Component{
    render(){
        return(
            <div id="dog-bar">
                {this.props.dogs.map(d => <DogButton renderDog={this.props.renderDog} dog={d}/>)}
            </div>
        )
    }
}

export default DogBar
