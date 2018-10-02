import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Messages from "../common/Messages";

// import { getCommandPlayer, getPositions, updateCommandPlayer, separatePlayer } from '../../actions/playerActions';
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
    background: "transparent",
    border: "1px solid #43A047",
    color: "rgba(0,0,0,.5)",
    borderRadius: 40,
    transition: ".3s",
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
    photo: ""
  };

  onChangeFileHandler = e => {
    const reader = new FileReader();
    let photoes = this.state.photoArray;
    if (e.target.files[0]) {
      // this.setState({ ...this.state, openCrop: true });
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener(
        "load",
        () => {
          photoes.push(reader.result);
          this.setState({
            photoArray: photoes
          });
        },
        false
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div>
          <InputFile
            type="image"
            className={classes.input}
            name="photo"
            onChange={this.onChangeFileHandler}
          />
          Добавить изображение
        </div>
        <div className={classes.flexWrap}>
          {this.state.photoArray.map((photo, i) => (
            <div className={classes.imgWrap}>
              <img src={photo} alt="" />
              <IconButton className={classes.delete}>&#x2716;</IconButton>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
  // connect(
  //   mapStateToProps,
  //   { getCommandPlayer, getPositions, updateCommandPlayer, separatePlayer }
  // )
)(AddPhoto);
