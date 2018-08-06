import React, { Component } from "react";

class ChooseLeague extends Component {
  state = {
    league: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const setLeague = {
      league_id: this.state.league
    };

    console.log(setLeague);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <select name="sport-type" disabled="disabled">
            <option value="football" selected>
              Футбол
            </option>
          </select>
          <select name="league" onChange={this.onChangeHandler}>
            {leagueOptions}
          </select>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    );
  }
}

export default ChooseLeague;
