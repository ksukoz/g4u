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
    borderRight: "none",
    width: 170,
    position: "relative",
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up("md")]: {
      width: drawerWidth
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#43A047",
      outline: "1px solid slategrey"
    },
    "&::-webkit-scrollbar": {
      width: 5
    },
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
    width: theme.spacing.unit * 6,
    [theme.breakpoints.up("md")]: {
      width: theme.spacing.unit * 10.3
    }
  },
  wrapper: {
    height: "100vh",
    boxShadow: "inset 0 0 1px rgba(0, 0, 0, 0.8)"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("md")]: {
      padding: "0 8px"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  listItem: {
    padding: "12px 15px",
    [theme.breakpoints.up("md")]: {
      padding: "12px 18px",
      paddingRight: 15
    }
  },
  nav_link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  nav_icon: {
    width: 20,
    [theme.breakpoints.up("md")]: {
      width: 40,
      paddingRight: 0
    }
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
            <Link
              className={classes.nav_link}
              to="/"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.news" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Newspaper} alt="" />
                <ListItemText
                  className={
                    !this.props.common.open ? classes.hide : classes.text
                  }
                  primary={<FormattedMessage id="nav.news" />}
                />
              </ListItem>
            </Link>
            <Link
              className={classes.nav_link}
              to="/in-progress"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.tournaments" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={FootballCup} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.tournaments"
                    />
                  }
                />
              </ListItem>
            </Link>
            <Link
              className={classes.nav_link}
              to="/in-progress"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.commands" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={FootballClub} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.commands"
                    />
                  }
                />
              </ListItem>
            </Link>

            {JSON.parse(localStorage.getItem("user")).player === 0 ? (
              <Link
                className={classes.nav_link}
                to="/add-player"
                onClick={this.onClickHandler.bind(
                  this,
                  <FormattedMessage id="nav.players" />
                )}
              >
                <ListItem button className={classes.listItem}>
                  <img
                    className={classes.nav_icon}
                    src={FootballPlayers}
                    alt=""
                  />
                  <ListItemText
                    className={!this.props.common.open ? classes.hide : ""}
                    primary={
                      <FormattedMessage
                        className={classes.text}
                        id="nav.players"
                      />
                    }
                  />
                </ListItem>
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
                <ListItem button className={classes.listItem}>
                  <img
                    className={classes.nav_icon}
                    src={FootballPlayers}
                    alt=""
                  />
                  <ListItemText
                    className={!this.props.common.open ? classes.hide : ""}
                    primary={
                      <FormattedMessage
                        className={classes.text}
                        id="nav.players"
                      />
                    }
                  />
                </ListItem>
              </Link>
            )}

            <Link
              className={classes.nav_link}
              to="/appointments"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.appointments" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Football} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.appointments"
                    />
                  }
                />
              </ListItem>
            </Link>

            <Link
              className={classes.nav_link}
              to="/in-progress"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.queries" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Questions} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.queries"
                    />
                  }
                />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link
              className={classes.nav_link}
              to="/in-progress"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.terms" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Info} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage className={classes.text} id="nav.terms" />
                  }
                />
              </ListItem>
            </Link>
            <Link
              className={classes.nav_link}
              to="/edit-user"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.settings" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Settings} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.settings"
                    />
                  }
                />
              </ListItem>
            </Link>
            <Link
              className={classes.nav_link}
              to="/in-progress"
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.contacts" />
              )}
            >
              <ListItem button className={classes.listItem}>
                <img className={classes.nav_icon} src={Contacts} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={
                    <FormattedMessage
                      className={classes.text}
                      id="nav.contacts"
                    />
                  }
                />
              </ListItem>
            </Link>
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
