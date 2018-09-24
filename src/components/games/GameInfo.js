import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { getGameInfo } from '../../actions/gameActions';

const styles = (theme) => ({
	gameWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		[theme.breakpoints.up('md')]: {
			flexWrap: 'nowrap'
		}
	},
	colWrap: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center',
		fontSize: '1.6rem',
		boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
		marginBottom: '2rem',
		[theme.breakpoints.up('md')]: {
			width: '50%'
		}
	},
	scoreTitle: {
		fontSize: '4rem'
	},
	commandStatWrap: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		alignSelf: 'baseline',
		fontSize: '1.6rem',
		boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
		marginBottom: '2rem',
		[theme.breakpoints.up('md')]: {
			width: '50%'
		},
		'& ul, & h3': {
			width: '100%'
		},
		'& h3': {
			paddingLeft: '2rem'
		},
		'& li': {
			height: 'auto',
			fontSize: '1.4rem'
		}
	},
	commandImg: {
		width: 100,
		minWidth: 100,
		minHeight: 100,
		height: 100,
		[theme.breakpoints.up('md')]: {
			width: 200,
			minWidth: 200,
			minHeight: 200,
			height: 200
		}
	},
	card: {
		display: 'inline-block',
		width: 35,
		height: 35,
		marginLeft: 10,
		borderRadius: 5
	}
});

class GameInfo extends Component {
	componentDidMount = () => {
		this.props.getGameInfo(this.props.id);
	};

	render() {
		const { classes } = this.props;
		const { gameInfo } = this.props.games;

		return (
			<div>
				{gameInfo ? (
					<div>
						<div className={classes.gameWrap}>
							<div className={classes.commandWrap}>
								<img className={classes.commandImg} src={gameInfo.info.in.logo} alt="" />
								<h2>{gameInfo.info.in.title}</h2>
							</div>
							<h2 className={classes.scoreTitle}>{gameInfo.score}</h2>
							<div className={classes.commandWrap}>
								<img className={classes.commandImg} src={gameInfo.info.out.logo} alt="" />
								<h2>{gameInfo.info.out.title}</h2>
							</div>
						</div>
						<div>
							<h3>Дата и время</h3>
							<List className={classes.gameWrap}>
								<MenuItem className={classes.colWrap}>
									<h6>Стадион:</h6>
									<span>{gameInfo.stadium ? gameInfo.stadium.title : ''}</span>
								</MenuItem>
								<MenuItem className={classes.colWrap}>
									<h6>Дата и время:</h6>
									<span>
										{new Date(+gameInfo.date).toLocaleString('en-GB', {
											hour12: false
										})}
									</span>
								</MenuItem>
							</List>
						</div>
						<div className={classes.gameWrap}>
							<div className={classes.commandStatWrap}>
								<h3>Состав {gameInfo.info.in.title}</h3>
								<List>
									{gameInfo.event_in.map((event) => (
										<MenuItem key={event.plId} className={classes.gameWrap}>
											<h4>{event.name}</h4>
											<span>
												{event.yellow ? (
													<span
														className={classes.card}
														style={{ background: 'rgba(255, 243, 67, 1)' }}
													/>
												) : (
													''
												)}{' '}
												{event.red ? (
													<span
														className={classes.card}
														style={{ background: 'rgba(255, 94, 94, 1)' }}
													/>
												) : (
													''
												)}{' '}
												{event.goal ? (
													<span
														className={classes.card}
														style={{
															verticalAlign: 'bottom'
														}}
													>
														Г:{event.goal}
													</span>
												) : (
													''
												)}{' '}
												{event.assist ? (
													<span className={classes.card} style={{ verticalAlign: 'bottom' }}>
														П:{event.assist}
													</span>
												) : (
													''
												)}
											</span>
										</MenuItem>
									))}
								</List>
							</div>
							<div className={classes.commandStatWrap}>
								<h3>Состав {gameInfo.info.out.title}</h3>
								<List>
									{gameInfo.event_out.map((event) => (
										<MenuItem key={event.plId} className={classes.gameWrap}>
											<h4>{event.name}</h4>
											<span>{`${event.yellow ? `Ж:${event.yellow}` : ''} ${event.red
												? `К:${event.red}`
												: ''} ${event.goal ? `Г:${event.goal}` : ''} ${event.assist
												? `П:${event.assist}`
												: ''}`}</span>
										</MenuItem>
									))}
								</List>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	games: state.games
});

export default compose(withStyles(styles), connect(mapStateToProps, { getGameInfo }))(GameInfo);
