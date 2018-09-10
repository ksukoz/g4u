import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getCities } from "../../actions/tournamentActions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Location extends Component {
  state = {
    countries: null
  };

  componentDidMount = () => {
    this.props.getCities();
  };

  render() {
    const { classes } = this.props;
    const { location } = this.props.tournaments;
    let citiesList;

    if (location) {
      citiesList = location.map(locationItem => (
        <ExpansionPanel key={locationItem.name}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {locationItem.name} ({locationItem.city.length})
          </ExpansionPanelSummary>
          {locationItem.city
            ? locationItem.city.map(cityItem => (
                <ExpansionPanelDetails key={cityItem.cId}>
                  <Link to={`/tournaments/${cityItem.cId}`}>
                    {cityItem.name} ({cityItem.count})
                  </Link>
                </ExpansionPanelDetails>
              ))
            : ""}
        </ExpansionPanel>
      ));
    }

    return <div className={classes.root}>{citiesList}</div>;
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCities }
  )
)(Location);
