import React, { Component } from 'react'
import axios from 'axios'

export class EditForm extends Component {

constructor(props) {
  super(props)

  this.state = {
     singleUser : {},
  }
}


componentDidMount = () => {
  console.log("inside ComponentDidMount");
  const { id } = this.props.match.params;
   const Url = `http://localhost:8000/api/users/${id}`;
    axios
      .put(Url)
      .then((response) => {
         this.setState({
           singleUser : response.data
         },() => console.log(this.state.singleUser))
        }) 
        .catch(err => {
          console.log(err);
        })
}

handleChange = (e) => {
  const {name,value} = e.target
  this.setState({
    singleUser : {
      ...this.state.singleUser,
       [name]: value,
    }
  });
}


handleSubmit = () => {
  const { id } = this.props.match.params;
   const Url = `http://localhost:8000/api/users/${id}`;
    axios
      .put(Url,this.state.singleUser)
      .then((response) => {
         console.log(response.data,"response");
        })
        .catch(err => {
          console.log(err);
        })

        this.props.history.push('/showlist')
}

  render() {
    const {
      firstname,
      lastname,
      email,
      mobileNumber,
      password,
      confirmPassword
    } = this.state.singleUser
    return (
      <div>
        <div className="container mt-5 p-5 signupdesign">
        <form  className="p-5" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              name='firstname'
              value={firstname}
              onChange={this.handleChange}
              placeholder="Enter your First Name"
              autoComplete="off"
            />
            {/* {errors.firstNameError ? <div className ="errorMessage">{errors.firstNameError}</div> : null} */}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={lastname}
              onChange={this.handleChange}
              placeholder="Enter your last name"
              autoComplete="off"
            />
            {/* {errors.lastNameError ? <div className ="errorMessage">{errors.lastNameError}</div> : null} */}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter your email address"
              autoComplete="off"
            />
            {/* {errors.emailError ? <div className="errorMessage">{errors.emailError}</div> : null} */}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="mobileNumber"
              value={mobileNumber}
              onChange={this.handleChange}
              placeholder="Enter your contact number"
              autoComplete="off"
            />
            {/* {errors.passwordError ? (
              <div className="errorMessage">{errors.mobileNumberError}</div>
            ) : null} */}
          </div>
          {/* <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
              autoComplete="off"
            />
            {errors.passwordError ? <div className="errorMessage">{errors.passwordError}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword} 
              onChange={this.handleChange}  
              placeholder="Password"
              autoComplete="off"
            />
            {errors.confirmPasswordError ? (
              <div className ="errorMessage">{errors.confirmPasswordError}</div>
            ) : null}
          </div> */}
          <button type="submit" className="btn btn-secondary mt-3 btn-setting">
            Submit
          </button>
        </form>
      </div>
      </div>
    )
  }
}

export default EditForm
