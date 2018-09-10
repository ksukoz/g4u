import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getSubTournaments } from "../../actions/tournamentActions";
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});
class SubTournaments extends Component {
  componentDidMount = () => {
    this.props.getSubTournaments(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    const { subTournaments } = this.props.tournaments;

    let subTourList;

    if (subTournaments) {
      subTourList = subTournaments.seasons.map(season => (
        <ExpansionPanel key={season.season_id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {season.title}
          </ExpansionPanelSummary>
          {season.tourney
            ? season.tourney.map(tourneyItem => (
                <ExpansionPanelDetails key={tourneyItem.tourneyId}>
                  <Link to={`/tournaments/${tourneyItem.tourneyId}`}>
                    {tourneyItem.title}
                  </Link>
                </ExpansionPanelDetails>
              ))
            : ""}
        </ExpansionPanel>
      ));
    }

    return (
      <div>
        {subTournaments ? (
          <img src={subTournaments.logo} alt="" style={{ width: "100%" }} />
        ) : (
          ""
        )}
        <List>{subTourList}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getSubTournaments }
  )
)(SubTournaments);
