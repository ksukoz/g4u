import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { getNews } from "../../actions/newsActions";
import NewsItem from "./NewsItem";

const styles = theme => ({
  button: {
    display: "block",
    marginLeft: "auto",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover, &:active": {
      backgroundColor: "#55a462",
      color: "#fff"
    },

    "&:hover,&:active": {},
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  }
});

class News extends Component {
  componentWillMount() {
    this.props.getNews();
  }

  render() {
    const { classes } = this.props;
    const { news } = this.props.news;
    let newsList;
    if (news !== null) {
      newsList = news.map(newsItem => (
        <NewsItem
          key={newsItem.news_id}
          id={newsItem.news_id}
          name={newsItem.name}
          title={newsItem.title}
          text={newsItem.text}
          date={newsItem.date}
          image={newsItem.photo ? newsItem.photo : ""}
          liked={newsItem.liked}
          maker={newsItem.maker}
        />
      ));
    }
    return (
      <div className="News">
        {+JSON.parse(localStorage.getItem("user")).personal_type === 1 ||
        +JSON.parse(localStorage.getItem("user")).personal_type === 7 ? (
          <Link className={classes.button_link} to="/add-news">
            <Button
              variant="extendedFab"
              aria-label="Delete"
              className={classes.button}
            >
              Добавить новость
            </Button>
          </Link>
        ) : (
          ""
        )}
        <div className={classes.news}>{newsList}</div>
      </div>
    );
  }
}

News.propTypes = {
  classes: PropTypes.object.isRequired,
  news: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  news: state.news
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getNews }
  )
)(News);
