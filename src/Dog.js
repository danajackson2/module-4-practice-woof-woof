import React from 'react'

function Dog(props){
        return(
            <div id="dog-summary-container">
                <h1>{props.dog.name}</h1>
                <button onClick={() => props.setDog(props.dog)}>{props.dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button><br />
                <img src={props.dog.image} />
            </div>
        )
}

export default Dog