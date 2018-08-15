import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getNews, setLike } from "../../actions/newsActions";

import Test from "./img/test_bg.png";

const styles = theme => ({
  card: {
    position: "relative",
    width: "70%",
    borderRadius: 20,
    marginBottom: "1rem"
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
    transform: "translateY(0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  // shortTextHide: {
  //   height: 0,
  //   transform: "translateY(-1000%)"
  // },
  icon: {
    color: "#fff"
  },
  date: {
    color: "#fff"
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
            <Typography component="p">
              {/* This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like. */}
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
              Читать дальше
            </span>
          </Button>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{this.props.text}</Typography>
              {/* <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don’t open.)
              </Typography> */}
              <Typography>{this.props.name}</Typography>
            </CardContent>
          </Collapse>
          {/* <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          /> */}
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
