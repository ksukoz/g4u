import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Messages from '../common/Messages';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { getCurrentGamesList, getFutureGamesList, addGamesPlayers, getGamePlayerList } from '../../actions/gameActions';

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
	state = {
		open: false,
		openModal: false,
		players: null,
		game: ''
	};

	checkboxArray = [];

	handleChange = (i) => (event) => {
		let playersCopy = this.state.players;

		playersCopy[i].status = !playersCopy[i].status;

		this.setState({
			...this.state,
			players: playersCopy
		});
	};

	// onSubmitHandler = (name) => (e) => {
	// 	e.preventDefault();

	// };

	handleCancel = () => {
		this.setState({ openModal: false });
	};

	handleOk = () => {
		this.setState({ openModal: false });
		this.props.addGamesPlayers(this.state.game, { listPl: this.state.players });
	};

	handleClickListItem = (name) => (e) => {
		e.stopPropagation();
		this.props.getGamePlayerList(name);
		this.setState({ ...this.state, openModal: true, game: name });
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		if (this.props.messages) {
			this.setState(
				{ open: false },
				this.props.type === 'future' ? this.props.getFutureGamesList() : this.props.getCurrentGamesList()
			);
		}

		this.setState({ open: false });
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.games.playerList) {
			this.setState({ ...this.state, players: nextProps.games.playerList });
		}
	}

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
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<span>{game.inTitle}</span>
							<img src={game.inLogo} style={{ width: 50, height: 50, margin: '0 1rem' }} alt="" />
						</span>
						<strong>{game.score}</strong>
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<img src={game.outLogo} style={{ width: 50, height: 50, margin: '0 1rem' }} alt="" />
							<span>{game.outTitle}</span>
						</span>
						<div style={{ display: 'flex', marginLeft: 'auto' }}>
							{game.cap === '1' ? (
								<Button onClick={this.handleClickListItem(game.game_id)} className={classes.button}>
									Изменить состав
								</Button>
							) : (
								''
							)}
							<Link to={`/game/${game.game_id}`} className={classes.button}>
								Подробнее
							</Link>
						</div>
					</ExpansionPanelSummary>

					{game.players ? (
						game.players.map((player) => (
							<ExpansionPanelDetails key={player.plid} className={classes.expDetails}>
								{`${player.name} (№${player.number} - ${player.type})`}
							</ExpansionPanelDetails>
						))
					) : (
						''
					)}
				</ExpansionPanel>
			));
		} else if (this.props.type === 'future' && futureGamesList) {
			gameList = futureGamesList.map((game, i) => (
				<ExpansionPanel key={game.game_id}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expSummary}>
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<span>{game.inTitle}</span>
							<img src={game.inLogo} style={{ width: 50, height: 50, margin: '0 1rem' }} alt="" />
						</span>
						<strong>{game.score}</strong>
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<img src={game.outLogo} style={{ width: 50, height: 50, margin: '0 1rem' }} alt="" />
							<span>{game.outTitle}</span>
						</span>
						<div style={{ display: 'flex', marginLeft: 'auto' }}>
							{game.cap === '1' ? (
								<Button onClick={this.handleClickListItem(game.game_id)} className={classes.button}>
									Изменить состав
								</Button>
							) : (
								''
							)}
							<Link to={`/game/${game.game_id}`} className={classes.button}>
								Подробнее
							</Link>
						</div>
					</ExpansionPanelSummary>

					{game.players ? (
						game.players.map((player) => (
							<ExpansionPanelDetails key={player.plid} className={classes.expDetails}>
								{`${player.name} (№${player.number} - ${player.type})`}
							</ExpansionPanelDetails>
						))
					) : (
						''
					)}
				</ExpansionPanel>
			));
		}

		return (
			<div>
				<div>
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
				</div>
				<List className={classes.container}>{gameList}</List>
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					fullWidth
					maxWidth="lg"
					aria-labelledby="confirmation-dialog-title"
					open={this.state.openModal}
				>
					<DialogTitle id="confirmation-dialog-title" style={{ textAlign: 'center' }}>
						<span style={{ fontSize: '2.5rem' }}>Изменить состав</span>
					</DialogTitle>
					<DialogContent>
						{this.state.players ? (
							<List>
								{this.state.players.map((player, i) => (
									<MenuItem
										key={player.plId}
										className={classes.listItem}
										style={{ display: 'flex', justifyContent: 'space-between' }}
									>
										{`${player.name} (№${player.number} - ${player.type})`}
										{
											<FormControlLabel
												control={
													<Checkbox
														name="status"
														checked={player.status}
														onChange={this.handleChange(i)}
														value={player.status}
														classes={{
															root: classes.checkbox,
															checked: classes.checked
														}}
													/>
												}
											/>
										}
									</MenuItem>
								))}
							</List>
						) : (
							''
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCancel} className={classes.button} color="primary">
							Отменить
						</Button>
						<Button onClick={this.handleOk} className={classes.button}>
							Подтвердить
						</Button>
					</DialogActions>
				</Dialog>
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
	connect(mapStateToProps, { getCurrentGamesList, getFutureGamesList, addGamesPlayers, getGamePlayerList })
)(MyGamesList);
