import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Messages from '../common/Messages';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import { getCurrentGamesList, getFutureGamesList, addGamesPlayers } from '../../actions/gameActions';

const styles = (theme) => ({
	button_link: {
		display: 'block',
		width: '100%',
		color: '#000',
		textDecoration: 'none',
		transition: '.3s'
	},
	listItem: {
		borderBottom: '1px solid rgba(0,0,0,.2)',
		'& strong': {
			padding: '0 2rem'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	flexDiv: {
		display: 'flex',
		marginBottom: '2rem',
		[theme.breakpoints.up('xs')]: {
			flexDirection: 'column'
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row'
		}
	},
	centered: {
		display: 'flex',
		alignSelf: 'center',
		margin: '0 2rem',
		marginBottom: '2rem',
		'& span': {
			alignSelf: 'center',
			paddingLeft: '2rem',
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	avatar: {
		height: 150,
		width: 150
	},
	expDetails: {
		margin: '1rem 3rem',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0,
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	expSummary: {
		'& div': {
			alignItems: 'center'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	link: {
		width: '100%',
		textDecoration: 'none',
		color: '#000'
	},
	button: {
		display: 'block',
		background: 'transparent',
		border: '1px solid #43A047',
		color: 'rgba(0,0,0,.5)',
		borderRadius: 40,
		transition: '.3s',
		margin: '2rem',
		color: 'rgba(0,0,0,.8)',
		textDecoration: 'none',
		padding: '1rem 2rem!important',
		marginLeft: 'auto',
		'&:hover, &:active': {
			backgroundColor: '#43A047',
			color: '#fff'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	tablesWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	tablesCol: {
		width: '100%',
		'& ul, & h2': {
			padding: '0 2rem'
		},
		[theme.breakpoints.up('md')]: {
			width: '49%'
		}
	},
	container: {
		padding: '1rem 10%'
	},
	checkbox: {
		color: '#43A047',
		'&$checked': {
			color: '#43A047'
		}
	},
	checked: {}
});

class MyGamesList extends Component {
	state = {};

	checkboxArray = [];

	handleChange = (name) => (event, isChecked) => {
		event.stopPropagation();
		if (isChecked) {
			this.checkboxArray.push(name);
		} else {
			this.checkboxArray.splice(this.checkboxArray.indexOf(name), 1);
		}
		console.log(event, isChecked, name, this.checkboxArray);
	};

	onSubmitHandler = (name) => (e) => {
		e.preventDefault();
		this.props.addGamesPlayers(name, { listPl: this.checkboxArray });
		this.checkboxArray = [];
	};

	componentDidMount = () => {
		this.props.type === 'future' ? this.props.getFutureGamesList() : this.props.getCurrentGamesList();
	};

	render() {
		const { classes } = this.props;
		const { currentGamesList, futureGamesList } = this.props.games;

		let gameList;

		if (this.props.type === 'current' && currentGamesList) {
			gameList = currentGamesList.map((game, i) => (
				<ExpansionPanel key={game.game_id}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expSummary}>
						<span>{game.inTitle}</span>
						<strong>{game.score}</strong>
						<span>{game.outTitle}</span>
						<Link to={`/game/${game.game_id}`} className={classes.button}>
							Подробнее
						</Link>
					</ExpansionPanelSummary>

					<form onSubmit={this.onSubmitHandler(game.game_id)}>
						{game.players ? (
							game.players.map((player) => (
								<ExpansionPanelDetails key={player.plid} className={classes.expDetails}>
									{player.name}
									{game.cap === '1' ? (
										<FormControlLabel
											control={
												<Checkbox
													name="status"
													// checked={player.status}
													onChange={this.handleChange(player.plid)}
													value={player.status}
													classes={{
														root: classes.checkbox,
														checked: classes.checked
													}}
												/>
											}
										/>
									) : player.status ? (
										<span>Заявлен</span>
									) : (
										''
									)}
								</ExpansionPanelDetails>
							))
						) : (
							''
						)}
						{game.cap === '1' ? (
							<Button type="submit" className={classes.button}>
								Сохранить
							</Button>
						) : (
							''
						)}
					</form>
				</ExpansionPanel>
				// <Link to={`/game/${game.game_id}`} className={classes.link} key={game.game_id}>
				// 	<MenuItem className={classes.listItem} key={game.game_id}>

				// 	</MenuItem>
				// </Link>
			));
		} else if (this.props.type === 'future' && futureGamesList) {
			gameList = futureGamesList.map((game, i) => (
				<ExpansionPanel key={new Date() + i}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expSummary}>
						<span>{game.inTitle}</span>
						<strong>{game.score}</strong>
						<span>{game.outTitle}</span>
						<Link to={`/game/${game.game_id}`} className={classes.button} key={game.game_id}>
							Подробнее
						</Link>
					</ExpansionPanelSummary>
					{game.players ? (
						game.players.map((player) => (
							<ExpansionPanelDetails key={player.plid} className={classes.expDetails}>
								{/* <Link to={`/tournaments/${cityItem.cId}`}>
									{cityItem.name} ({cityItem.count})
                                </Link> */}
								{player.name}
							</ExpansionPanelDetails>
						))
					) : (
						''
					)}
					{game.cap === '1' ? <Button className={classes.button}>Сохранить</Button> : ''}
				</ExpansionPanel>
			));
		}

		return (
			<List className={classes.container}>
				{gameList}
				{/* {props.gameList.map((game) => (
              <Link to={`/game/${game.game_id}`} className={classes.link} key={game.game_id}>
                  <MenuItem className={classes.listItem} key={game.game_id}>
                      <span>{game.inTitle}</span>
                      <strong>{game.score}</strong>
                      <span>{game.outTitle}</span>
                  </MenuItem>
              </Link>
          ))} */}
			</List>
		);
	}
}

const mapStateToProps = (state) => ({
	games: state.games
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, { getCurrentGamesList, getFutureGamesList, addGamesPlayers })
)(MyGamesList);
