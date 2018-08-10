import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { handleDrawerOpen } from "../../actions/commonActions";
import { logoutUser } from "../../actions/authActions";
import { Button } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#55a462"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

const drawerWidth = 295;

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  appBar: {
    backgroundColor: "#43A047",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  logout: {
    marginLeft: "auto",
    color: "#fff"
  }
};

class Header extends React.Component {
  onClickHandler = e => {
    this.props.logoutUser();
  };

  componentDidMount() {
    // this.setState({activeLink: })
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={classNames(
              classes.appBar,
              this.props.common.open && classes.appBarShift
            )}
          >
            <Toolbar
              className={classes.tollbar}
              disableGutters={!this.props.common.open}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.props.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.props.common.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {/* {Mini variant drawer} */}
                {this.props.common.activeLink
                  ? this.props.common.activeLink
                  : "Новости"}
              </Typography>
              <Button className={classes.logout} onClick={this.onClickHandler}>
                Выйти
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  common: state.common
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { handleDrawerOpen, logoutUser }
  )
)(Header);
