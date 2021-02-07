import React from 'react';
import './App.css';
import DogFilterButton from './DogFilterButton'
import DogBar from './DogBar'
import Dog from './Dog'

class App extends React.Component {
  state={
    allDogs: [],
    dogs: [],
    selectedDog: {},
    filterOn: false
  }

  getAllDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => this.setState({allDogs: data, dogs:data}))
  }

  componentDidMount(){
    this.getAllDogs()
  }

  setDog = (dog) => {
    let newVal = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`,{
      method: 'PATCH',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({isGoodDog: newVal})
    })
    .then(res => res.json())
    .then(dog => {
      this.renderDog(dog)
      this.getAllDogs()
    })
  }

  renderDog = (dog) => {
    this.setState({selectedDog: dog})
  }

  filterDogs = () => {
    let newBoolean = !this.state.filterOn
    if (newBoolean) {
      let newDogList = this.state.allDogs.filter(d => d.isGoodDog === true)
      this.setState({dogs: newDogList, filterOn: newBoolean})
    } else {
      this.setState({dogs: this.state.allDogs, filterOn: newBoolean})
    }

  }

  render(){
    return (
      <div className="App">
        <DogFilterButton filterOn={this.state.filterOn} filterDogs={this.filterDogs}/>
        <DogBar dogs={this.state.dogs} renderDog={this.renderDog}/>
        <Dog dog={this.state.selectedDog} setDog={this.setDog}/>
      </div>
    );
  }
}

export default App;
