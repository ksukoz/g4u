import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

class AppointGame extends Component {
  state = {
    game: ""
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      game: this.props.match.url.replace(/\D/g, "")
    });
  }

  render() {
    return (
      <div>
        <Link to={`/event/add/${this.state.game}`}>
          <Button>Создать событие</Button>
        </Link>
      </div>
    );
  }
}

export default AppointGame;
