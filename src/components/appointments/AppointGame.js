import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Messages from '../common/Messages';

import { getCurrentGame, deleteEvent } from '../../actions/gameActions';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

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
	checked: {},
	input: {
		width: '40%'
	},
	input_wrap: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '1rem'
	},
	select: {
		width: '100%',
		paddingTop: '1rem'
	},
	button: {
		display: 'inline-block',
		marginBottom: '2rem',
		padding: '1rem 5rem',
		background: '#fff',
		border: '1px solid #55a462',

		borderRadius: 40,
		boxShadow: 'none',
		'&:hover,&:active': {
			background: '#55a462',
			color: '#fff'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	button_link: {
		display: 'inline-block',
		marginLeft: '2rem',
		color: '#000',
		textDecoration: 'none',
		transition: '.3s'
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		color: '#fff',
		marginBottom: '1rem'
	},
	listItem: {
		borderBottom: '1px solid rgba(0,0,0,.2)',
		height: 'auto'
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	game_wrap: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	list: {
		// width: "100%",
		'& *': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	game: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '2rem',
		'& img': {
			width: 50,
			height: 50,
			[theme.breakpoints.up('md')]: {
				height: '25rem',
				width: 'auto'
			}
		}
	},
	cross: {
		color: '#ff5e5e'
	},
	paper: {
		width: '100%',
		padding: '2rem'
	}
});

class AppointGame extends Component {
	state = {
		gameId: '',
		game: null
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		if (this.props.messages) {
			this.setState({ open: false }, this.props.getCurrentGame(this.props.match.url.replace(/\D/g, '')));
		}

		this.setState({ open: false });
	};

	componentDidMount() {
		this.setState({
			...this.state,
			gameId: this.props.id ? this.props.id : this.props.match.url.replace(/\D/g, '')
		});

		this.props.id
			? this.props.getCurrentGame(this.props.id)
			: this.props.getCurrentGame(this.props.match.url.replace(/\D/g, ''));
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.games.currentGame !== null) {
			this.setState({
				...this.state,
				currentGame: nextProps.games.currentGame
			});
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div>
					{this.props.id ? (
						''
					) : (
						<Button
							size="large"
							className={classes.button}
							style={{ marginBottom: '1rem' }}
							onClick={() => this.props.history.goBack()}
						>
							Назад
						</Button>
					)}

					{+JSON.parse(localStorage.getItem('user')).personal_type === 1 ||
					+JSON.parse(localStorage.getItem('user')).personal_type === 7 ? (
						<Link to={`/event/add/${this.state.gameId}`} className={classes.button_link}>
							<Button className={classes.button} variant="extendedFab">
								Создать событие
							</Button>
						</Link>
					) : (
						''
					)}
				</div>
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
				{this.state.currentGame ? (
					<div className={classes.game_wrap}>
						<div className={classes.game}>
							<img src={this.state.currentGame.info.in.logo} alt="" className={classes.commandImg} />
							<h3>{this.state.currentGame.info.in.title}</h3>
						</div>
						<div className={classes.game}>
							<img src={this.state.currentGame.info.out.logo} alt="" className={classes.commandImg} />
							<h3>{this.state.currentGame.info.out.title}</h3>
						</div>
						<Paper className={classes.paper}>
							<h2>События игры</h2>
							<List className={classes.list}>
								{this.state.currentGame.events.map((event, i) => (
									<MenuItem className={classes.listItem} key={i}>
										<span style={{ marginRight: 8 }}>{event.minute}'</span>
										<span>{event.title}</span>
										<img src={event.logo} alt="" style={{ height: 50, marginLeft: 'auto' }} />
										<Button
											className={classes.cross}
											onClick={() => this.props.deleteEvent(event.evId)}
										>
											&#10006;
										</Button>
									</MenuItem>
								))}
							</List>
						</Paper>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	games: state.games,
	errors: state.errors,
	messages: state.messages
});

export default compose(withStyles(styles), connect(mapStateToProps, { getCurrentGame, deleteEvent }))(AppointGame);
