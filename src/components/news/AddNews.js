import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { addNews } from "../../actions/newsActions";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  form: {
    width: "50%"
  },
  input: {
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    background: "transparent",
    color: "rgba(0,0,0,.5)"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff"
  }
});

class AddNews extends Component {
  state = {
    title: "",
    text: "",
    tags: ""
  };

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
      text: this.state.text,
      tags: this.state.tags.split(",") || []
    };

    this.props.addNews(addNews);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <div className="news-form">
          <form onSubmit={this.onSubmit}>
            <div>
              <Input
                className={classes.input}
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                placeholder="Заголовок новости"
              />
            </div>
            <div>
              <TextField
                className={classes.input}
                id="multiline-flexible"
                label="Multiline"
                multiline
                rows="10"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                margin="normal"
              />
            </div>
            <div>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                placeholder="Заголовок новости"
              />
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                className={classes.button}
              >
                <AddIcon />
              </Button>
            </div>
            <small>Тэги вводите через запятую, как в примере</small>
            <div>
              <Button
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Сохранить новость
              </Button>
              {/* <input value="" /> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    { addNews }
  )
)(AddNews);
