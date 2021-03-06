import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import classnames from "classnames";

import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getNews, setLike } from "../../actions/newsActions";

import Pencil from "./img/pencil.svg";

import Test from "./img/test_bg.png";

const styles = theme => ({
  card: {
    position: "relative",
    width: "99%",
    borderRadius: 20,
    marginBottom: "1rem",
    border: "1px solid rgba(0,0,0,0.2)",
    [theme.breakpoints.up("md")]: {
      width: "70%"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, .5)"
  },
  expand: {
    color: "#55a462",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  hide: {
    display: "none"
  },
  shortText: {
    fontSize: "2rem",
    transform: "translateY(0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  text: {
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  icon: {
    color: "#fff"
  },
  date: {
    color: "#fff",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  }
});

class NewsItem extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  onClickHandler = e => {
    let id = { id: e.target.id };
    if (e.target.tagName === "path") {
      id.id = e.target.parentNode.id;
    }
    this.props.setLike(id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.shortText}>
            <Typography component="h2" variant="display1">
              {this.props.title}
            </Typography>
          </CardContent>
          <Button
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
            <span
              className={classnames(classes.expand, {
                [classes.hide]: this.state.expanded
              })}
            >
              <FormattedMessage id="news.more" />
            </span>
          </Button>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                paragraph
                dangerouslySetInnerHTML={{
                  __html: this.props.text
                }}
                variant="body2"
                className={classes.text}
              />
              <Typography className={classes.text}>
                {this.props.name}
              </Typography>
            </CardContent>
          </Collapse>
          <CardMedia
            className={classes.media}
            image={this.props.image ? this.props.image : Test}
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <div>
              <IconButton aria-label="Add to favorites">
                {this.props.liked === "0" ? (
                  <FavoriteBorder
                    className={classes.icon}
                    onClick={this.onClickHandler}
                    id={this.props.id}
                  />
                ) : (
                  <Favorite
                    className={classes.icon}
                    onClick={this.onClickHandler}
                    id={this.props.id}
                  />
                )}
              </IconButton>
              {+this.props.maker ===
              +JSON.parse(localStorage.getItem("user")).personal ? (
                <Link to={`/news/edit/${this.props.id}`}>
                  <IconButton aria-label="Add to favorites">
                    <img src={Pencil} alt="" style={{ height: 20 }} />
                  </IconButton>
                </Link>
              ) : (
                ""
              )}
              {/* <IconButton aria-label="Share">
                <ShareIcon className={classes.icon} />
              </IconButton> */}
            </div>

            <div className={classes.date}>{this.props.date}</div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

NewsItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { getNews, setLike }
  )
)(NewsItem);
