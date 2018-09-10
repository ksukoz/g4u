import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { getTournaments } from "../../actions/tournamentActions";
const styles = theme => ({
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
    border: "1px solid rgba(0,0,0,.2)",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});
class Tournaments extends Component {
  componentDidMount = () => {
    this.props.getTournaments(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List>
          {this.props.tournaments.tournaments
            ? this.props.tournaments.tournaments.map(tournament => (
                <Link
                  className={classes.button_link}
                  to={`/subtournaments/${tournament.tournament_id}`}
                  key={tournament.tournament_id}
                >
                  <MenuItem
                    className={classes.listItem}
                    value={tournament.tournament_id}
                  >
                    {tournament.title}
                  </MenuItem>
                </Link>
              ))
            : ""}
        </List>
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
    { getTournaments }
  )
)(Tournaments);
