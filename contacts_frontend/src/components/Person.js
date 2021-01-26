import React from 'react'

class Person extends React.Component {
  render = () => {
    return (
      <div>
        <div className="people">
          <div className="person">
            <h4>Name: {this.props.person.name}</h4>
            <h5>Age: {this.props.person.age}</h5>
            <button
              value={this.props.person.id}
              onClick={this.props.deletePerson}
            >
              X
            </button>
            <details>
              <summary>Edit Person</summary>
              <form
                id={this.props.person.id}
                onSubmit={this.props.updatePerson}
              >
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  onChange={this.props.handleChange}
                />
                <label htmlFor="age">Age</label>
                <br />
                <input
                  type="text"
                  id="age"
                  onChange={this.props.handleChange}
                />
                <br />
                <input type="submit" value="Update Person" />
              </form>
            </details>
          </div>
        </div>
      </div>
    )
  }
}

export default Person
