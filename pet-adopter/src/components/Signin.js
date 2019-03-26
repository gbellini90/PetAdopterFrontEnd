import React from 'react';
import { Redirect } from 'react-router-dom';
import ProfileContainer from './ProfileContainer';

const apiUsersAddress = 'http://localhost:3000/api/v1/login'

class Signin extends React.Component {

  state = {
    username: '',
    password: '',
    // myPets: this.props.myPets
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(apiUsersAddress,{
      method:"POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body:JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(userObj => {
      localStorage.setItem('jwt', userObj.token)
      const usersAdoptedPets = userObj.pets.filter(pet => pet.owner_id === userObj.id)
      this.props.setCurrentUser(userObj)
      this.props.setMyPets(userObj.matches, usersAdoptedPets)
    })
  }

  render() {
    const signInForm =
      <div className="signinDiv">
        <h1 className="signinHeader">Sign In To Save Pets!</h1>
        <br/><br/>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <input className="signinPlaceholders"
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
              placeholder="username"
            />
            <input className="signinPlaceholders"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              placeholder="password"
              type="password"
            />
            <input
              type="submit"
              className="signinButton"
            />
          </form>
        </div>
      </div>
    return this.props.currentUser ? <Redirect to="/" /> : signInForm;
  }
}

export default Signin;
