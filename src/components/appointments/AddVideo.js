import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Messages from "../common/Messages";

import { addVideo, deleteVideo, getVideos } from "../../actions/gameActions";
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

import YouTube from "react-youtube";

const styles = theme => ({
  flexWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  flexRow: {
    display: "flex",
    alignItems: "center",
    "& span": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
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
    "& iframe": {
      width: "100%",
      height: "auto"
    },
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

class AddVideo extends Component {
  state = {
    open: false,
    videosArray: [],
    videos: [],
    video: ""
  };

  onChangeHandler = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onDeleteHandler = i => e => {
    let arr = this.state.videosArray;
    arr.splice(i, 1);
    this.setState({ ...this.state, videosArray: arr });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getVideos(this.props.match.params.id);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.games.videos !== null) {
      this.setState({
        ...this.state,
        videos: nextProps.games.videos.video
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
        <div className={classes.flexRow}>
          <Button
            size="large"
            className={classes.button}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            onClick={() => this.props.history.goBack()}
          >
            Назад
          </Button>
          <TextField
            className={classes.input}
            name="video"
            onChange={this.onChangeHandler}
            value={this.state.video}
            label="Введите id видео"
          />
          <Button
            size="large"
            className={classes.button}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            onClick={e => {
              this.props.addVideo(this.props.match.params.id, {
                video: [this.state.video]
              });
              this.setState({ ...this.state, video: "" });
            }}
          >
            Добавить видео
          </Button>
        </div>

        <div className={classes.flexWrap}>
          {this.state.videos && this.state.videos.length > 0
            ? this.state.videos.map((video, i) => (
                <div className={classes.imgWrap} key={video.vId}>
                  <YouTube
                    videoId={video.youtube_id}
                    style={{ width: "100%" }}
                  />
                  <IconButton
                    className={classes.delete}
                    onClick={e =>
                      this.props.deleteVideo(
                        this.props.match.params.id,
                        video.vId
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
    { addVideo, getVideos, deleteVideo }
  )
)(AddVideo);
