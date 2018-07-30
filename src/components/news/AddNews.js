import React, { Component } from "react";
import { connect } from "react-redux";
import { addNews } from "../../actions/newsActions";

class AddNews extends Component {
  state = {
    title: "",
    desc: "",
    tags: ""
  };
  onClick = () => {};

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const addNews = {
      title: this.state.title,
      desc: this.state.desc,
      tags: this.state.tags.split(",")
    };

    this.props.addNews(addNews);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Добавить новость</button>
        <div />
        <div className="news-form">
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                placeholder="Заголовок новости"
              />
            </div>
            <div>
              <textarea
                name="desc"
                onChange={this.onChange}
                placeholder="Текст новости"
                value={this.state.desc}
              />
            </div>
            <div>
              <input
                type="text"
                name="tags"
                value={this.state.tags}
                onChange={this.onChange}
                placeholder="Тэг 1,Тэг 2,Тэг 3"
              />
            </div>
            <small>Тэги вводите через запятую, как в примере</small>
            <input type="submit" value="Сохранить новость" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addNews }
)(AddNews);
