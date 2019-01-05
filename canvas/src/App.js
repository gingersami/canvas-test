import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    const response = await Axios.get(
      "https://www.mocky.io/v2/59bd9a773c00001303529fe0"
    );
    this.setState({ users: response.data.users });

    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
  }

  renderUsers() {
    if (this.state.users.length > 0) {
      return this.state.users.map(user => {
        return (
          <img
            alt=""
            src={user.picture}
            onDragEnd={this.onDragEnd}
            draggable
            style={{ maxHeight: "200px" }}
            onDragStart={e => this.onDragStart(e, user.picture)}
            key={user.user}
          />
        );
      });
    }
    return null;
  }

  onDragStart = (e, image) => {
    this.setState({ currentImage: image });
  };

  onDragOverCanvas = e => {
    // console.log(e.target)
  };

  onDragEnd = e => {
    const bb = this.canvas.getBoundingClientRect();
    const offsetX = bb.left;
    const offsetY = bb.top;
    const newX = parseFloat(e.clientX - offsetX);
    const newY = parseFloat(e.clientY - offsetY);
    const baseImage = new Image();
    baseImage.src = this.state.currentImage;
    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(baseImage, newX, newY, 100, 100);

    this.setState({ currentImage: "" });
  };

  render() {
    return (
      <div className="App">
        {this.renderUsers()}
        <canvas
          onDragOver={this.onDragOverCanvas}
          ref={e => {
            this.canvas = e;
          }}
          style={{ border: "1px solid red" }}
          id="canvas"
          width="1920px"
          height="800px"
        />
        <a href={this.state.imageLink} onClick={this.onClick}>
          DL ME
        </a>
      </div>
    );
  }
}

export default App;
