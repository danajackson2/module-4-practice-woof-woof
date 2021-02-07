import React from 'react'

function DogFilterButton(props){
    return(
        <div id="filter-div">
            <button onClick={props.filterDogs} id="good-dog-filter">Filter good dogs: {props.filterOn === true ? 'ON' : 'OFF'}</button>
        </div>
    )
}

export default DogFilterButton