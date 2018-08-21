import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import classNames from "classnames";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { handleDrawerClose, setActiveLink } from "../../actions/commonActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Newspaper from "./navigation-icons/newspaper.svg";
import FootballCup from "./navigation-icons/american-football-cup.svg";
import FootballClub from "./navigation-icons/football-club.svg";
import FootballPlayers from "./navigation-icons/football-shirt.svg";
import Football from "./navigation-icons/player.svg";
import Questions from "./navigation-icons/question.svg";
import Info from "./navigation-icons/info.svg";
import Settings from "./navigation-icons/settings.svg";
import Contacts from "./navigation-icons/agenda.svg";

const drawerWidth = 295;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 10.3
    }
  },
  wrapper: {
    position: "fixed",
    height: "100vh",
    boxShadow: "inset 0 0 1px rgba(0, 0, 0, 0.8)"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  listItem: {
    padding: "12px 18px",
    paddingRight: 15
  },
  nav_link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  nav_icon: {
    width: 40,
    paddingRight: 10
  },
  hide: {
    display: "none"
  }
});

class Navigation extends React.Component {
  state = {
    open: false
  };

  onClickHandler = text => {
    this.props.setActiveLink(text);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.props.common.open && classes.drawerPaperClose
          )
        }}
      >
        <div className={classes.wrapper}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.news" />
                )}
              >
                <img className={classes.nav_icon} src={Newspaper} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.news" />}
                />
              </Link>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.tournaments" />
                )}
              >
                <img className={classes.nav_icon} src={FootballCup} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.tournaments" />}
                />
              </Link>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.commands" />
                )}
              >
                <img className={classes.nav_icon} src={FootballClub} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.commands" />}
                />
              </Link>
            </ListItem>
            <ListItem button className={classes.listItem}>
              {JSON.parse(localStorage.getItem("user")).player === 0 ? (
                <Link
                  className={classes.nav_link}
                  to="/add-player"
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.players" />
                  )}
                >
                  <img
                    className={classes.nav_icon}
                    src={FootballPlayers}
                    alt=""
                  />
                  <ListItemText
                    className={!this.props.common.open ? classes.hide : ""}
                    primary={<FormattedMessage id="nav.players" />}
                  />
                </Link>
              ) : (
                <Link
                  className={classes.nav_link}
                  to="/edit-player"
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.players" />
                  )}
                >
                  <img
                    className={classes.nav_icon}
                    src={FootballPlayers}
                    alt=""
                  />
                  <ListItemText
                    className={!this.props.common.open ? classes.hide : ""}
                    primary={<FormattedMessage id="nav.players" />}
                  />
                </Link>
              )}
            </ListItem>

            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.appointments" />
                )}
              >
                <img className={classes.nav_icon} src={Football} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.appointments" />}
                />
              </Link>
            </ListItem>

            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.queries" />
                )}
              >
                <img className={classes.nav_icon} src={Questions} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.queries" />}
                />
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.terms" />
                )}
              >
                <img className={classes.nav_icon} src={Info} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.terms" />}
                />
              </Link>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/edit-user"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.settings" />
                )}
              >
                <img className={classes.nav_icon} src={Settings} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.settings" />}
                />
              </Link>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <Link
                className={classes.nav_link}
                to="/in-progress"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.contacts" />
                )}
              >
                <img className={classes.nav_icon} src={Contacts} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.contacts" />}
                />
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  common: state.common
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { handleDrawerClose, setActiveLink }
  )
)(Navigation);
