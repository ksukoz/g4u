import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getNews } from "../../actions/newsActions";

class News extends Component {
  componentWillMount() {
    this.props.getNews();
  }

  render() {
    const { news } = this.props.news;
    let newsList;
    if (news !== null) {
      newsList = news.map(newsItem => console.log(newsItem));
    }
    return (
      <div>
        <Link to="/add-news">Добавить новость</Link>
        <h1>Новости</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { getNews }
)(News);
