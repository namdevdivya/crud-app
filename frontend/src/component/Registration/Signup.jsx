
import React from "react";
import  {withRouter} from "react-router-dom";
import axios from 'axios';
// import "./Style.css";

const ErrorOutput = ({ error }) => <span> {error} </span>;

const FormItem = ({ label, input, error }) => (
  <div>
    <label> {label} </label> <input {...input} />
    {error && <ErrorOutput error={error} />}
  </div>
);

class Signup extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    data : [],
    user: '',
    
    //submit: false,
    errors: {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      mobileNumberError: "",
      passwordError: "",
      confirmPasswordError: "",
    },
  };



// componentDidMount = () => {
//   const { id} = this.props.location.state;
//       const Url = `http://localhost:8000/api/users/${id}`;
//       axios
//         .put(Url)
//         .then((response) => {
//             this.setState({
//               user : response.data,
//             })
//           });
//           console.log(this.state.user,"userewdfhn");
// }


  handleSubmit = (event) => {
     
    const{name,value} = event.target;
    
    event.preventDefault();
    let tempErrors = {
      firstNameError : '',
      lastNameError : '',
      emailError : '',
      mobileNumberError : '',
      passwordError : '',
      confirmPasswordError : '',
    }
    let flag=1;

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      errors,
    } = this.state;

    if (firstName === "") {
      console.log("this field is required");
      tempErrors.firstNameError = 'this field is required'
      flag = 0;  
    }
    if (lastName === "") {
      console.log("this field is required");
      tempErrors.lastNameError = 'this field is required'
      flag = 0;
    }
    if (email === "") {
      console.log("this field is required");
      tempErrors.emailError = 'this field is required'
      flag = 0;
    }
    if (mobileNumber === "") {
      console.log("this field is required");
      tempErrors.mobileNumberError = 'this field is required'
      flag = 0;
    }
    if (password === "") {
      console.log("this field is required");
      tempErrors.passwordError = 'this field is required'
      flag=0;
    }
    if (confirmPassword === "") {
      console.log("this field is required");
      tempErrors.confirmPasswordError = 'this field is required'
    }


    this.setState({
      errors : tempErrors
     })
      if(flag === 1){   
        alert('form submitted successfully')
       
      }else{
        return false;
      }

      const data = {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        confirmPassword
      } 
      
      const Url = "http://localhost:8000/api/users";
      axios
        .post(Url ,data)
        .then((response) => {
          console.log(response,"bkjsdjksabd")
          });
      this.props.history.push("/showlist");

    this.setState({
      firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    })
   
  };

  handleInput = (event) => {
    const{name,value} = event.target
    this.setState({
      [name]: value,
    });
 };

  validate = () => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
    } = this.state;

    let errors = {};

    // Name error checking
    switch (true) {
      case !firstName:
        errors.firstNameError = "First name is required";
        break;
      case !firstName.match(/^[a-zA-Z]+$/):
        errors.firstNameError = "First name can have only letters";
        break;
      case firstName.length <= 2:
        errors.firstNameError =
          "First name needs to be at least 2 characters long";
        break;
      default:
        errors.firstNameError = "";
        break;
    }
    switch (true) {
      case !lastName:
        errors.lastNameError = "Last name is required";
        break;
      case !lastName.match(/^[a-zA-Z]+$/):
        errors.lastNameError = "Last name can have only letters";
        break;
      case lastName.length <= 2:
        errors.lastNameError =
          "Last name needs to be at least 2 characters long";
        break;
      default:
        errors.lastNameError = "";
        break;
    }

    switch (true) {
      case !email:
        errors.emailError = "Email name is required";
        break;
      case !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/):
        errors.emailError = "email is invalida";
        break;
      
      default:
        errors.emailError = "";
        break;
    }

    switch (true) {
      case !mobileNumber:
        errors.mobileNumberError = "Mobile Number is required";
        break;
      case !mobileNumber.match(/^[0-9]+$/):
        errors.mobileNumberError = "Mobile Number can have only numbers";
        break;
      case mobileNumber.length !== 10:
        errors.mobileNumberError =
          "Mobile Number must  be  10 digits";
        break;
      default:
        errors.mobileNumberError = "";
        break;
    }
    switch (true) {
      case !password:
        errors.passwordError = "Password is required";
        break;
     
      case password.length !== 8:
        errors.passwordError =
          "password needs to be at least 8 characters long";
        break;
      default:
        errors.passwordError = "";
        break;
    }

    switch (true) {
      case !confirmPassword:
        errors.confirmPasswordError = "Password is required";
        break;
      
      case confirmPassword.length !== 8:
        errors.confirmPasswordError =
          "confirm password must be at least 8 characters long";
        break;
        case confirmPassword !== password :
          errors.confirmPasswordError = "confirm password must be same as password"
      default:
        errors.confirmPasswordError = "";
        break;
    }

    this.setState({
      errors,
    });
  };

// removeData = (event) => {
// const {value} = event.target
// let getData = [];
//  getData.push(...this.state.data);
// console.log(getData,"hiii");
// getData.splice(value,1);
// this.setState({
//   data : getData
// })
// }
  
  render() {
   
    
    const {
      data,
      errors,
    } = this.state;
  

    return (
      <div className="container mt-5 p-5 signupdesign">
        <div className="heading mb-5">
          {" "}
          <h1 className="signupheading">Register a user</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInput}
              onBlur={this.validate}
              placeholder="Enter your First Name"
              autoComplete="off"
            />
            {errors.firstNameError ? <div className ="errorMessage">{errors.firstNameError}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInput}
              onBlur={this.validate}
              placeholder="Enter your last name"
              autoComplete="off"
            />
            {errors.lastNameError ? <div className ="errorMessage">{errors.lastNameError}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              onBlur={this.validate}
              placeholder="Enter your email address"
              autoComplete="off"
            />
            {errors.emailError ? <div className="errorMessage">{errors.emailError}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="mobileNumber"
              value={this.state.mobileNumber}
              onChange={this.handleInput}
              onBlur={this.validate}
              placeholder="Enter your contact number"
              autoComplete="off"
            />
            {errors.passwordError ? (
              <div className="errorMessage">{errors.mobileNumberError}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              onBlur={this.validate}
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
              value={this.state.confirmPassword}
              onChange={this.handleInput}
              onBlur={this.validate}
              placeholder="Password"
              autoComplete="off"
            />
            {errors.confirmPasswordError ? (
              <div className ="errorMessage">{errors.confirmPasswordError}</div>
            ) : null}
          </div>

         
          <button type="submit" className="btn btn-secondary mt-3 btn-setting"
           onClick={this.handleStorage}
          >
            Submit
          </button>
        </form>
        
      </div>
    );
  }
}

export default withRouter(Signup);
