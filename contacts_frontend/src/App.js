import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    name: '',
    age: '',
    people: [],
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/people', this.state).then((response) => {
      this.getPeople()
    })
  }

  getPeople = () => {
    axios
      .get('/people')
      .then(
        (response) => this.setState({ people: response.data }),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  deletePerson = (event) => {
    axios.delete('/people/' + event.target.value).then((response) => {
      this.getPeople()
    })
  }

  updatePerson = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/people/' + id, this.state).then((response) => {
      this.getPeople()
      this.setState({
        name: '',
        age: '',
      })
    })
  }

  componentDidMount = () => {
    this.getPeople()
  }

  render = () => {
    return (
      <div className="app">
        <h2>Create New Person</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <br />
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            onChange={this.handleChange}
            value={this.state.age}
          />
          <br />
          <input type="submit" value="Create Person" />
        </form>
        <div className="people">
          {this.state.people.map((person) => {
            return (
              <div className="person" key={person.id}>
                <h4>Name: {person.name}</h4>
                <h5>Age: {person.age}</h5>
                <button value={person.id} onClick={this.deletePerson}>
                  X
                </button>
                <details>
                  <summary>Edit Person</summary>
                  <form id={person.id} onSubmit={this.updatePerson}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input type="text" id="name" onChange={this.handleChange} />
                    <label htmlFor="age">Age</label>
                    <br />
                    <input type="text" id="age" onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Update Person" />
                  </form>
                </details>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
