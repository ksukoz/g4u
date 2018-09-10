import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getTournaments } from "../../actions/tournamentActions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Tournaments extends Component {
  componentDidMount = () => {
    this.props.getTournaments(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    return <div>hi</div>;
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
