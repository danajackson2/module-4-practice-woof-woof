import React from 'react';

function DogButton(props) {
    return(
        <span onClick={() => props.renderDog(props.dog)}>{props.dog.name}</span>
    )
}

export default DogButton