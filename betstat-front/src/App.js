import React, { Component } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { DisplayBoard } from "./components/DisplayBoard";
import { betdatas, overall } from "./services/UserService";
import { Matches } from "./components/Matches";
import { MoreDetails } from "./components/InteractiveWindow";

class App extends Component {

  state = {
    currentID: '',
    matches: [],
  };

  betdatas = () => {
    betdatas().then((matches) => {
      this.setState({matches: matches})
    })};

    consol = () => {
      console.log(this.state);
    }

    getAndSendID = (e) => {
      this.setState({currentID: e.target.className});
      overall(this.state.currentID)
    };

    sortujto = () => {
      console.log(this.state.matches)
    }

  render() {
    return (
      <div className="App">
        <Header></Header>
              <DisplayBoard
                numberOfMatches ={this.state.matches.length}
                betdatas={this.betdatas}
                consol={this.consol}
                sortujto={this.sortujto}
              ></DisplayBoard>
        <div className="row">
          <Matches matches={this.state.matches} getAndSendID={this.getAndSendID}></Matches>
          {/* <MoreDetails details={this.state.matches}></MoreDetails> */}
        </div>
      </div>
    );
  }
}

export default App;
