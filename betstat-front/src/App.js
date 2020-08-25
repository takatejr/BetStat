import React, { Component } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Users } from "./components/Users";
import { DisplayBoard } from "./components/DisplayBoard";
import CreateUser from "./components/CreateUser";
import { getAllUsers, createUser, scrapData, betdatas } from "./services/UserService";
import { Matches } from "./components/Matches";

class App extends Component {
  state = {
    user: {},
    users: [],
    numberOfUsers: 0,
    matches: [],
  };

  createUser = (e) => {
    createUser(this.state.user).then((response) => {
      console.log(response);
      this.setState({ numberOfUsers: this.state.numberOfUsers + 1 });
    });
  };

  getAllUsers = () => {
    getAllUsers().then((users) => {
      console.log(users);
      this.setState({ users: users, numberOfUsers: users.length });
      console.log(this.state)
    });
  };

  scrapData = () => {
    scrapData().then((matches) => {
      console.log(matches);
      this.setState({matches: matches});
    });
  };

  betdatas = () => {
    betdatas().then((matches) => {
      console.log(matches);
      this.setState({matches: matches[0]})
      console.log(this.state)
    })}

  onChangeForm = (e) => {
    let user = this.state.user;
    if (e.target.name === "firstname") {
      user.firstName = e.target.value;
    } else if (e.target.name === "lastname") {
      user.lastName = e.target.value;
    } else if (e.target.name === "email") {
      user.email = e.target.value;
    }
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="">
          <div className="row">
            <div className="col-md-8">
              <CreateUser
                user={this.state.user}
                onChangeForm={this.onChangeForm}
                createUser={this.createUser}
              ></CreateUser>
            </div>
            <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={this.state.numberOfUsers}
                getAllUsers={this.getAllUsers}
                betdatas={this.betdatas}
              ></DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <Users users={this.state.users}></Users>
          <Matches matches={this.state.matches}></Matches>
        </div>
      </div>
    );
  }
}

export default App;
