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
import Chip from "@material-ui/core/Chip";
import InputFile from "../common/InputFile";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  form: {
    width: "49%"
  },
  media: {
    width: "49%"
  },
  img: {
    width: "100%"
  },
  input: {
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    background: "transparent",
    color: "rgba(0,0,0,.5)",
    transition: ".3s",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    }
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff"
  },
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  }
});

class AddNews extends Component {
  state = {
    title: "",
    text: "",
    photo: "",
    tag: "",
    tags: []
  };

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onChangeFileHandler = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      "load",
      () => {
        this.setState({
          photo: reader.result
        });
      },
      false
    );
  };

  onClickHandler = () => {
    const tagItem = this.state.tag;
    const tagList = this.state.tags;
    if (tagItem.length > 0) {
      tagList.push(tagItem);

      this.setState({
        ...this.state,
        tags: tagList,
        tag: ""
      });
    }
  };

  onDeleteHandle = data => () => {
    const tagsList = [...this.state.tags];
    tagsList.splice(data, 1);
    this.setState({
      ...this.state,
      tags: tagsList
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const addNews = {
      title: this.state.title,
      text: this.state.text,
      photo: this.state.photo,
      tags: this.state.tags
    };

    this.props.addNews(addNews);
  };

  render() {
    const { classes } = this.props;
    const { tags } = this.state;
    let tagList;
    if (tags.length > 0) {
      tagList = tags.map((tag, i) => {
        return (
          <Chip
            key={i}
            label={tag}
            onDelete={this.onDeleteHandle(i)}
            className={classes.chip}
          />
        );
      });
    }

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                className={classes.input}
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 60);
                }}
                label="Заголовок новости"
                helperText="Заголовок новости может быть не более 60 символов"
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
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 9000);
                }}
                margin="normal"
                helperText="Текст новости может быть не более 9000 символов"
              />
            </div>
            <InputFile
              type="image"
              name={this.state.photo}
              onChange={this.onChangeFileHandler}
            />
            <div>
              <Input
                type="text"
                name="tag"
                value={this.state.tag}
                onChange={this.onChange}
                placeholder="Тэги"
              />
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                className={classes.button}
                onClick={this.onClickHandler}
              >
                <AddIcon />
              </Button>
              {tagList}
            </div>
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
        <div className={classes.media}>
          <img src={this.state.photo} className={classes.img} alt="" />
        </div>
      </div>
    );
  }
}

AddNews.propTypes = {
  classes: PropTypes.object
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { addNews }
  )
)(AddNews);
