import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import { getCurrentGame, getEventSettings, addGameEvent } from '../../actions/gameActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Messages from '../common/Messages';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	checkbox: {
		color: '#43A047',
		'&$checked': {
			color: '#43A047'
		}
	},
	rounds: {
		margin: '0 auto',
		marginBottom: '1rem',
		display: 'flex',
		flexDirection: 'column',
		height: 100,
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 500,
			flexDirection: 'row'
		}
	},
	roundsBtn: {
		border: '1px solid #43A047',
		maxWidth: '100%',
		[theme.breakpoints.up('md')]: {
			width: 'auto'
		},
		'& span': {
			[theme.breakpoints.up('md')]: {
				width: 'auto',
				fontSize: '1.5rem'
			}
		}
	},
	selected: {
		backgroundColor: '#43A047',
		color: '#fff',
		// "& span": {
		[theme.breakpoints.up('md')]: {
			fontSize: '2rem!important'
		}
		// }
	},
	checked: {},
	input: {
		width: '100%',
		marginBottom: '1rem',
		'& *': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	input_wrap: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '1rem'
	},
	select: {
		width: '100%',
		paddingTop: '1rem',
		'& *': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	button: {
		display: 'block',
		marginBottom: '2rem',
		padding: '1rem 5rem',
		background: '#fff',
		border: '1px solid #55a462',
		borderRadius: 40,
		boxShadow: 'none',
		'&:hover,&:active': {
			background: '#55a462'
		},

		'&:hover a,&:active': {
			color: '#fff'
		},
		[theme.breakpoints.up('md')]: {
			width: 'auto',
			fontSize: '1.5rem'
		}
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		color: '#fff',
		marginBottom: '1rem',
		[theme.breakpoints.up('md')]: {
			width: 'auto',
			fontSize: '1.5rem'
		}
	},
	listItem: {
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	success: {
		backgroundColor: '#43A047',
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	game_wrap: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	game: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& img': {
			height: '25rem'
		}
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	container: {
		padding: '1rem 10%'
	}
});

const initialState = {
	open: false,
	type: '',
	assistevent: '0',
	player: '0',
	assistant: '0',
	comment: ''
};

class AddEvent extends Component {
	state = {
		open: false,
		gameId: '',
		currentGame: null,
		minutes: '',
		type: '',
		assistevent: '0',
		command: '',
		player: '0',
		assistant: '0',
		comment: ''
	};

	onChangeHandler = (e) => {
		if (e.target.name === 'comment') {
			if (e.target.value.length > 500) {
				this.setState({
					...this.state,
					[e.target.name]: e.target.value.slice(0, 500)
				});
			} else {
				this.setState({
					...this.state,
					[e.target.name]: e.target.value
				});
			}
		} else {
			this.setState({
				...this.state,
				[e.target.name]: e.target.value.replace(/[а-я]+/gi, '')
			});
		}
	};

	handleChange = (event, command) => {
		this.setState({
			...this.state,
			command
		});
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		if (this.props.messages) {
			this.setState(initialState);
		}

		this.setState({ open: false });
	};

	onSubmitHandler = (e) => {
		e.preventDefault();

		const newEvent = {
			type_event_id: this.state.type,
			command_id: this.state.command,
			player_id: this.state.player,
			comment: this.state.comment,
			assist_id: this.state.assistant,
			minute: this.state.minutes,
			assist_type_id: this.state.assistevent
		};

		this.props.addGameEvent(this.state.gameId, newEvent);
	};

	componentDidMount() {
		this.setState({
			...this.state,
			gameId: this.props.match.url.replace(/\D/g, '')
		});

		this.props.getCurrentGame(this.props.match.params.id);
		this.props.getEventSettings(this.props.match.params.id);
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.games.currentGame !== null) {
			this.setState({
				...this.state,
				currentGame: nextProps.games.currentGame,
				minutes: ((Date.now() - Date.parse(nextProps.games.currentGame.date)) / 60000).toFixed(),
				command: nextProps.games.currentGame.info.in.command_id
			});
		}
	};

	render() {
		const { classes } = this.props;
		const { settings } = this.props.games;
		let settingsList;
		let playersList;
		let assistantsList;
		let assistanteventsList;

		if (this.state.command) {
			if (settings !== null) {
				settingsList = settings.type.map((option) => (
					<MenuItem value={option.type_event_id} key={option.type_event_id} className={classes.listItem}>
						{option.title}
					</MenuItem>
				));

				assistantsList = settings.players[this.state.command].map((player) => (
					<MenuItem value={player.plid} key={player.plid} className={classes.listItem}>
						#{player.number} {player.name}
					</MenuItem>
				));

				assistanteventsList = settings.assistevent.map((event) => (
					<MenuItem value={event.type_event_id} key={event.type_event_id} className={classes.listItem}>
						{event.title}
					</MenuItem>
				));
				playersList = settings.players[this.state.command].map((player) => (
					<MenuItem value={player.plid} key={player.plid} className={classes.listItem}>
						#{player.number} {player.name}
					</MenuItem>
				));
			}
		}

		return (
			<div className={classes.container}>
				<Button
					size="large"
					className={classes.button}
					style={{ marginBottom: '1rem' }}
					onClick={() => this.props.history.goBack()}
				>
					Назад
				</Button>
				{this.state.currentGame !== null ? (
					<BottomNavigation
						value={this.state.command}
						onChange={this.handleChange}
						showLabels
						className={classes.rounds}
					>
						<BottomNavigationAction
							classes={{ selected: classes.selected, root: classes.roundsBtn }}
							label={this.state.currentGame.info.in.title}
							value={this.state.currentGame.info.in.command_id}
						/>
						<BottomNavigationAction
							classes={{ selected: classes.selected, root: classes.roundsBtn }}
							label={this.state.currentGame.info.out.title}
							value={this.state.currentGame.info.out.command_id}
						/>
					</BottomNavigation>
				) : (
					''
				)}
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
					''
				)}
				<form onSubmit={this.onSubmitHandler}>
					<TextField
						label="Минута матча"
						name="minutes"
						className={classes.input}
						value={this.state.minutes}
						onChange={this.onChangeHandler}
						type="number"
						margin="normal"
					/>
					<FormControl className={classes.input}>
						<InputLabel htmlFor="type">Тип события</InputLabel>
						<Select
							value={this.state.type}
							className={classes.select}
							onChange={this.onChangeHandler}
							inputProps={{
								name: 'type',
								id: 'type'
							}}
						>
							<MenuItem value="" />
							{settingsList}
						</Select>
					</FormControl>
					<FormControl className={classes.input}>
						<InputLabel htmlFor="player">Игрок</InputLabel>
						<Select
							value={this.state.player}
							className={classes.select}
							onChange={this.onChangeHandler}
							inputProps={{
								name: 'player',
								id: 'player'
							}}
						>
							{playersList}
						</Select>
					</FormControl>
					<FormControl className={classes.input}>
						<InputLabel htmlFor="assistevent">Тип события</InputLabel>
						<Select
							value={this.state.assistevent}
							className={classes.select}
							onChange={this.onChangeHandler}
							inputProps={{
								name: 'assistevent',
								id: 'assistevent'
							}}
						>
							<MenuItem value="0" />
							{assistanteventsList}
						</Select>
					</FormControl>
					<FormControl className={classes.input}>
						<InputLabel htmlFor="assistant">Ассистент</InputLabel>
						<Select
							value={this.state.assistant}
							className={classes.select}
							onChange={this.onChangeHandler}
							inputProps={{
								name: 'assistant',
								id: 'assistant'
							}}
						>
							<MenuItem value="0">Неизвестно</MenuItem>
							{assistantsList}
						</Select>
					</FormControl>
					<TextField
						label="Комментарий"
						name="comment"
						multiline
						rows={4}
						className={classes.input}
						value={this.state.comment}
						onChange={this.onChangeHandler}
						margin="normal"
					/>

					<Button size="large" type="submit" className={classes.submit}>
						Сохранить
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	games: state.games,
	errors: state.errors,
	messages: state.messages
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, { getCurrentGame, getEventSettings, addGameEvent })
)(AddEvent);
