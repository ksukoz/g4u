import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getAppoints } from "../../actions/tournamentActions";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
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

class Appointments extends Component {
  state = {
    open: false,
    matchesList: null
  };

  componentDidMount = () => {
    this.props.getAppoints();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.matches !== null) {
      this.setState({
        ...this.state,
        matchesList: nextProps.tournaments.matches
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {" "}
        <List>
          {this.state.matchesList !== null
            ? this.state.matchesList.map(match => (
                <Link
                  className={classes.button_link}
                  to={`/game/${match.id}`}
                  key={match.id}
                >
                  <MenuItem className={classes.listItem} value={match.id}>
                    {`${match.game.in.title} : ${match.game.out.title}`}
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
  tournaments: state.tournaments,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAppoints }
  )
)(Appointments);
