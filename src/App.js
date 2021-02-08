import React from 'react';
import './App.css';
import DogFilterButton from './DogFilterButton'
import DogBar from './DogBar'
import Dog from './Dog'

class App extends React.Component {
  state={
    allDogs: [],
    selectedDog: {},
    filterOn: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => this.setState({allDogs: data}))
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
      this.updateDog(dog)
    })
  }

  updateDog = (dog) => {
    this.setState( prevState => {
      let findDog = prevState.allDogs.find(d => d.id === dog.id)
      findDog.isGoodDog = !findDog.isGoodDog
      return {
        allDogs: prevState.allDogs
      }})
  }

  renderDog = (dog) => {
    this.setState({selectedDog: dog})
  }

  filteredDogs = () => {
    return this.state.filterOn ? this.state.allDogs.filter(d => d.isGoodDog === true) : this.state.allDogs
  }

  filterDogs = () => {    
    let newBoolean = !this.state.filterOn
    this.setState({filterOn: newBoolean})
  }

  render(){
    return (
      <div className="App">
        <DogFilterButton filterOn={this.state.filterOn} filterDogs={this.filterDogs}/>
        <DogBar dogs={this.filteredDogs()} renderDog={this.renderDog}/>
        <Dog dog={this.state.selectedDog} setDog={this.setDog}/>
      </div>
    );
  }
}

export default App;
