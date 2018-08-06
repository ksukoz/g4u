import React, { Component } from "react";
import { connect } from "react-redux";
import { getLeagues, setLeagues } from "../../actions/leagueActions";

class ChooseLeague extends Component {
  state = {
    league: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    if (this.state.league.length > 0) {
      const leagueId = {
        league_id: this.state.league
      };

      this.props.setLeagues(leagueId, this.props.history);
    }
  };

  componentWillMount() {
    this.props.getLeagues();
  }

  render() {
    const { leaguesList } = this.props.leagues;
    let leaguesOptions;
    if (leaguesList !== null) {
      leaguesOptions = leaguesList.map(league => (
        <option key={league.id} value={league.id}>
          {league.title}
        </option>
      ));
    }

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <select name="sport-type" disabled="disabled">
            <option value="football" selected>
              Футбол
            </option>
          </select>
          <select name="league" onChange={this.onChangeHandler}>
            <option selected disabled>
              Выбрать лигу
            </option>
            {leaguesOptions}
          </select>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leagues: state.leagues
});

export default connect(
  mapStateToProps,
  { getLeagues, setLeagues }
)(ChooseLeague);
