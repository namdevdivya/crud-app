import React, { Component } from "react";
import axios from "axios";
import{ Link }from 'react-router-dom'

export class ShowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      singleUser: "",
    };
  }

  componentDidMount = () => {
    const Url = "http://localhost:8000/api/users";
    axios
      .get(Url)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEdit = (id) => {
    console.log(id, "idd");
    this.props.history.push(`/editform/${id}`);
  };

  handleDelete = (id) => {
    const Url = `http://localhost:8000/api/users/${id}`;
    axios
      .delete(Url)
      .then((response) => {
        console.log(response.data);
        alert('user Deleted successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { users } = this.state;
    console.log(users, "users");
    return (
      <div>
        <h1>User Listing</h1>
       <Link to="/signup"> <button className="add-user-btn btn btn-primary">Add User</button></Link>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">MobileNumber</th>
              <th scope="col">Password</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              console.log(user, "userrr");
              const {
                firstname,
                lastname,
                email,
                mobileNumber,
                password,
                _id,
              } = user;
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{firstname}</td>
                  <td>{lastname}</td>
                  <td>{email}</td>
                  <td>{mobileNumber}</td>
                  <td>{password}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.handleEdit(_id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowList;
