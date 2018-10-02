import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Messages from "../common/Messages";

import { addPhoto, deletePhoto, getPhotoes } from "../../actions/gameActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputFile from "../common/InputFile";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  flexWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  imgWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    border: "1px solid rgba(0,0,0,.2)",
    textAlign: "center",
    transition: ".3s",
    marginBottom: "2rem",
    [theme.breakpoints.up("md")]: {
      width: "30%"
    }
  },
  delete: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#ff5e5e",
    cursor: "pointer"
  },
  error: {
    color: "#ff5e5e",
    paddingBottom: "2rem",
    width: "100%",
    textAlign: "center"
  },
  input: {
    width: "100%",
    marginBottom: ".5rem",
    "& label, & input, & div": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  },
  select: {
    width: "100%"
  },
  button: {
    display: "block",
    background: "transparent",
    border: "1px solid #43A047",
    color: "rgba(0,0,0,.5)",
    borderRadius: 40,
    transition: ".3s",
    height: "max-content",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  submit: {
    marginTop: "1rem",
    marginRight: "1rem",
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem",
    "&:hover, &:active": {
      border: "1px solid #43A047",
      color: "rgba(0,0,0,.5)"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  container: {
    padding: "1rem 10%"
  }
});

class AddPhoto extends Component {
  state = {
    photoArray: [],
    photoes: [],
    photo: ""
  };

  onChangeFileHandler = async e => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      await reader.addEventListener(
        "load",
        () => {
          this.setState({
            ...this.state,
            photoArray: [...this.state.photoArray, reader.result]
          });
        },
        false
      );
    }
  };

  onDeleteHandler = i => e => {
    let arr = this.state.photoArray;
    arr.splice(i, 1);
    this.setState({ ...this.state, photoArray: arr });
  };

  componentDidMount() {
    this.props.getPhotoes(this.props.match.params.id);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.games.photoes !== null) {
      this.setState({
        ...this.state,
        photoes: nextProps.games.photoes.photo
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.props.errors ? (
          <Messages
            open={this.state.open}
            message={this.props.errors}
            onClose={this.handleClose}
            classes={classes.error}
          />
        ) : this.props.messages ? (
          <Messages
            open={this.state.open}
            message={this.props.messages}
            onClose={this.handleClose}
            classes={classes.success}
          />
        ) : (
          ""
        )}
        <div>
          <InputFile
            type="image"
            className={classes.input}
            name="photo"
            onChange={this.onChangeFileHandler}
            multiple={true}
          />
          Добавить изображение
        </div>

        {this.state.photoArray && this.state.photoArray.length > 0 ? (
          <div className={classes.flexWrap}>
            {this.state.photoArray.map((photo, i) => (
              <div className={classes.imgWrap} key={i}>
                <img src={photo} alt="" />
                <IconButton
                  className={classes.delete}
                  onClick={this.onDeleteHandler(i)}
                >
                  &#x2716;
                </IconButton>
              </div>
            ))}
            <Button
              size="large"
              className={classes.button}
              style={{ marginBottom: "1rem" }}
              onClick={e => {
                this.props.addPhoto(this.props.match.params.id, {
                  photo: this.state.photoArray
                });
                this.setState({ ...this.state, photoArray: [] });
              }}
            >
              Сохранить
            </Button>
          </div>
        ) : (
          ""
        )}

        <div className={classes.flexWrap}>
          {this.state.photoes && this.state.photoes.length > 0
            ? this.state.photoes.map((photo, i) => (
                <div className={classes.imgWrap} key={photo.pId}>
                  <img src={photo} alt="" />
                  <IconButton
                    className={classes.delete}
                    onClick={e =>
                      this.props.deletePhoto(
                        this.props.match.params.id,
                        photo.pId
                      )
                    }
                  >
                    &#x2716;
                  </IconButton>
                </div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addPhoto, getPhotoes, deletePhoto }
  )
)(AddPhoto);
