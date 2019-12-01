import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      _id:'',
      name: '',
      username: '',
      identification: '',
      password: '',
      photo: '',
      active: '',
      users: []
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addUser(e) {
    if(this.state._id){
      fetch(`http://localhost:4000/api/update/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          _id:'',
          name: '',
          username: '',
          identification: '',
          password: '',
          photo: '',
          active: '',
        });
        confirm('User information updated');
        this.fetchUsers();
      });
    }else{
      fetch('http://localhost:4000/api/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        this.setState({
          _id:'',
          name: '',
          username: '',
          identification: '',
          password: '',
          photo: '',
          active: '',
        });
        this.fetchUsers();
        confirm('New User Added');
      })
      .catch(err => console.error(err));
    }

    e.preventDefault();
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.error(err));
  }

  deleteUser(id) {
    if (confirm('Are you sure you want delete it?')) {
      fetch(`http://localhost:4000/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.fetchUsers();
        })
        .catch(err => console.error(err));
    }
  }

  editUser(id){
    fetch(`http://localhost:4000/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
          _id: data._id,
          name: data.name,
          username: data.username,
          identification: data.identification,
          password: data.password,
          photo: data.photo,
          active: data.active,
      })
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      //----------------Inicio-----------------------------
      <div>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.addUser}>
                    <div className="form-group row">
                      <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input name="name" onChange={this.handleChange} type="text" className="form-control" id="inputEmail3" value={this.state.name} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputEmail3" className="col-sm-2 col-form-label">UserName</label>
                      <div className="col-sm-10">
                        <input name="username" onChange={this.handleChange} type="text" className="form-control" id="inputEmail3" value={this.state.username} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputEmail3" className="col-sm-2 col-form-label">Identification</label>
                      <div className="col-sm-10">
                        <input name="identification" onChange={this.handleChange} type="number" className="form-control" id="inputEmail3" value={this.state.identification} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputEmail3" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-10">
                        <input name="password" onChange={this.handleChange} type="password" className="form-control" id="inputEmail3" value={this.state.password} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputEmail3" className="col-sm-2 col-form-label">Photo</label>
                      <div className="col-sm-10">
                        <input name="photo" onChange={this.handleChange} type="text" className="form-control" id="inputEmail3" value={this.state.photo} />
                      </div>
                    </div>
                    <fieldset className="form-group">
                      <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Active</legend>
                        <div className="col-sm-10">
                          <div className="form-check">
                            <input name="true" onChange={this.state.active = true} value={this.state.active} className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                            <label className="form-check-label" for="gridRadios1">
                              True
                        </label>
                          </div>
                          <div className="form-check">
                            <input name="false" onChange={this.state.active = false} value={this.state.active} className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                            <label className="form-check-label" for="gridRadios2">
                              False
                        </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <div className="form-group row">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Register</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col s7">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">UserName</th>
                      <th scope="col">Identification</th>
                      <th scope="col">Password</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map(user => {
                      return (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.identification}</td>
                          <td>{user.password}</td>
                          <td>{user.photo}</td>
                          <td>{user.password}</td>
                          <td>
                            <button className="btn btn-primary" onClick={() => this.deleteUser(user._id)}>Delete</button>
                            <button className="btn btn-primary" onClick={() => this.editUser(user._id)}>Edit</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      //----------------Fin-------------------------------
    )
  }
}

export default App;
