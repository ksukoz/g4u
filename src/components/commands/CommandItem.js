import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { getCommand } from "../../actions/commandActions";

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
    "& strong": {
      padding: "0 2rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  flexDiv: {
    display: "flex"
  },
  centered: {
    display: "flex",
    alignSelf: "center",
    margin: "0 2rem",
    "& span": {
      alignSelf: "center",
      paddingLeft: "2rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  },
  avatar: {
    height: 150,
    width: 150
  }
});

class CommandItem extends Component {
  componentDidMount = () => {
    this.props.getCommand(this.props.match.params.id);
  };
  render() {
    return <div>hi</div>;
  }
}

const mapStateToProps = state => ({
  commands: state.commands
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCommand }
  )
)(CommandItem);
