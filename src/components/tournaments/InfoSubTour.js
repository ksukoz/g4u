import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

import { getSubCommands } from "../../actions/tournamentActions";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  row: {
    "& *": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  },
  numberCell: {
    width: 50
  },
  flexCell: {
    display: "flex",
    "& span": {
      alignSelf: "center"
    }
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  expDetails: {
    margin: "0 2rem",
    fontSize: "1.5rem"
  },
  expSummary: {
    fontSize: "1.5rem"
  }
});

class InfoSubTour extends Component {
  componentDidMount = () => {
    this.props.getSubCommands(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    const { subCommands } = this.props.tournaments;
    let commandsList;

    if (subCommands) {
      commandsList = subCommands.commands.map((command, i) => (
        <TableRow key={command.comm.command_id} className={classes.row}>
          <TableCell className={classes.numberCell}>{i + 1}</TableCell>
          <TableCell component="th" scope="row" className={classes.flexCell}>
            <img
              src={command.comm.logo}
              alt=""
              style={{ height: 50, marginRight: 8 }}
            />
            <span>{command.comm.title}</span>
          </TableCell>
          {/* <TableCell component="th" scope="row" className={classes.cell}>
            {member.position}
          </TableCell>
          <TableCell className={classes.cell}>
            <img src={member.photo} style={{ width: "50px" }} alt="" />
          </TableCell> */}
        </TableRow>
      ));
    }

    return (
      <div>
        {commandsList ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell>№</TableCell>
                <TableCell>Команда</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{commandsList}</TableBody>
          </Table>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getSubCommands }
  )
)(InfoSubTour);
