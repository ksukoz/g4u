import React, { Component } from "react";
import { Link } from "react-router-dom";

class News extends Component {
  render() {
    return (
      <div>
        <Link to="/add-news">Добавить новость</Link>
        <h1>Новости</h1>
      </div>
    );
  }
}

export default News;
