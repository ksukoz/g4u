import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { getCommandsInfo } from "../../actions/tournamentActions";

const styles = theme => ({
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
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

class Command extends Component {
  componentDidMount = () => {
    this.props.getCommandsInfo(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.tournaments;
    let tournamentsList;

    if (commands) {
      tournamentsList = commands.subtours.map(subtour => (
        <MenuItem className={classes.listItem} key={subtour.tourId}>
          {subtour.title}
        </MenuItem>
      ));
    }

    const id = this.props.match.params.id;
    return (
      <div>
        <h2>Турниры</h2>
        <List>{tournamentsList}</List>
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
    { getCommandsInfo }
  )
)(Command);
