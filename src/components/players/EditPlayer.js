import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  getPlayer,
  getPositions,
  updatePlayer,
  separatePlayer
} from "../../actions/playerActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputFile from "../common/InputFile";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  error: {
    color: "#ff5e5e",
    paddingBottom: "2rem",
    width: "100%",
    textAlign: "center"
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
    width: "32%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between"
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
    }
  },
  submit: {
    marginTop: "1rem",
    marginRight: "1rem",
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  }
});

class EditPlayer extends Component {
  state = {
    name: "",
    surname: "",
    patronymic: "",
    position_id: "",
    birthday: "",
    stature: "",
    weight: "",
    phone: "",
    fb: "",
    vk: "",
    position: "",
    image: null,
    readyImage: "",
    error: "",
    crop: {
      x: 30,
      y: 30,
      width: 30,
      height: 30,
      aspect: 1 / 1
    }
  };

  onChangeFileHandler = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      "load",
      () => {
        this.setState({
          image: reader.result
        });
      },
      false
    );
  };

  getCroppedImg = () => {
    let img = new Image();
    let crop = this.state.crop;
    img.src = this.state.image;
    const targetX = (img.width * crop.x) / 100;
    const targetY = (img.height * crop.y) / 100;
    const targetWidth = (img.width * crop.width) / 100;
    const targetHeight = (img.height * crop.height) / 100;

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    this.setState({ readyImage: canvas.toDataURL("image/jpeg") });

    return canvas.toDataURL("image/jpeg");
  };

  imageLoaded = crop => {
    this.setState({ crop });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const updatedPlayer = {
      photo: this.state.readyImage,
      stature: this.state.stature,
      weight: this.state.weight,
      phone: this.state.phone,
      FB: this.state.fb,
      VK: this.state.vk
    };

    this.props.updatePlayer(updatedPlayer, this.props.history);
    this.setState({ ...this.state, image: null });
  };

  onClickHandler = e => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.separatePlayer(this.props.history);
    user.player = 0;
    localStorage.setItem("user", JSON.stringify(user));
  };

  componentDidMount() {
    this.props.getPositions();
    this.props.getPlayer();
  }

  componentWillReceiveProps(nextProps) {
    let player;
    let positions;
    if (
      nextProps.players.player !== null &&
      nextProps.players.positions !== null
    ) {
      player = nextProps.players.player;
      positions = nextProps.players.positions;
      this.setState({
        ...this.state,
        name: player.name,
        surname: player.surename,
        patronymic: player.patronymic,
        position_id: positions.filter(
          positionItem => positionItem.type === player.position
        )[0].position_id,
        birthday: player.birthday,
        stature: player.stature,
        weight: player.weight,
        phone: player.phone,
        fb: player.FB,
        vk: player.VK,
        readyImage: player.photo,
        position: player.position
      });
    }

    if (nextProps.errors.length > 0) {
      this.setState({
        ...this.state,
        error: nextProps.errors
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { positions } = this.props.players;

    let positionsList;
    if (positions !== null) {
      positionsList = positions.map(position => (
        <MenuItem key={position.position_id} value={position.position_id}>
          {position.type}
        </MenuItem>
      ));
    }

    return (
      <div className={classes.root}>
        <div className={classes.error}>
          <small variant="caption" component="small">
            {this.state.error}
          </small>
        </div>
        <div className={classes.form}>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <div className={classes.input_wrap}>
              <TextField
                label="Имя"
                name="name"
                className={classes.input}
                value={this.state.name}
                onChange={this.onChangeHandler}
                margin="normal"
                disabled
              />
              <TextField
                label="Фамилия"
                name="surname"
                className={classes.input}
                value={this.state.surname}
                onChange={this.onChangeHandler}
                margin="normal"
                disabled
              />
              <TextField
                label="Отчество"
                name="patronymic"
                className={classes.input}
                value={this.state.patronymic}
                onChange={this.onChangeHandler}
                margin="normal"
                disabled
              />
            </div>
            <div className={classes.input_wrap}>
              <InputFile
                type="image"
                className={classes.input}
                name="photo"
                onChange={this.onChangeFileHandler}
              />

              <FormControl className={classes.input}>
                <InputLabel htmlFor="position_id">Выбрать позицию</InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.position_id}
                  onChange={this.onChangeHandler}
                  inputProps={{
                    name: "position_id",
                    id: "position_id"
                  }}
                  disabled
                >
                  <MenuItem value={this.state.position_id} disabled>
                    {this.state.position}
                  </MenuItem>
                  {positionsList}
                </Select>
              </FormControl>
              <TextField
                id="birthday"
                label="Дата рождения"
                type="date"
                name="birthday"
                className={classes.input}
                value={this.state.birthday}
                onChange={this.onChangeHandler}
                InputLabelProps={{
                  shrink: true
                }}
                disabled
              />
            </div>
            <div className={classes.input_wrap}>
              <TextField
                label="Рост"
                type="number"
                name="stature"
                className={classes.input}
                value={this.state.stature}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Вес"
                type="number"
                name="weight"
                className={classes.input}
                value={this.state.weight}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Телефон"
                type="tel"
                name="phone"
                className={classes.input}
                value={this.state.phone}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <div className={classes.input_wrap}>
              <TextField
                label="Facebook"
                name="fb"
                className={classes.input}
                value={this.state.fb}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="VK"
                name="vk"
                className={classes.input}
                value={this.state.vk}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <Button size="large" type="submit" className={classes.submit}>
              Обновить
            </Button>
            <Button
              size="large"
              type="button"
              className={classes.button}
              onClick={this.onClickHandler}
            >
              Отвязать
            </Button>
          </form>

          {this.state.image && (
            <div>
              <ReactCrop
                style={{ width: "100%" }}
                ref="crop"
                src={this.state.image}
                crop={this.state.crop}
                onChange={this.imageLoaded}
                onComplete={this.getCroppedImg}
              />
            </div>
          )}
        </div>
        <div className={classes.media}>
          {this.state.readyImage !== null ? (
            <img src={this.state.readyImage} className={classes.img} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getPlayer, getPositions, updatePlayer, separatePlayer }
  )
)(EditPlayer);
