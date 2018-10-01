import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';

import Messages from '../common/Messages';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import { getSubtourGames } from '../../actions/tournamentActions';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.up('xs')]: {
			flexDirection: 'column'
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row'
		}
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
		display: 'block',
		marginBottom: '2rem',
		padding: '1rem 5rem',
		background: '#fff',
		border: '1px solid #55a462',
		borderRadius: 40,
		boxShadow: 'none',
		fontSize: '1.5rem',
		height: 'auto',
		'&:hover,&:active': {
			background: '#55a462'
		},

		'&:hover a,&:active': {
			color: '#fff'
		},
		[theme.breakpoints.up('xs')]: {
			width: '100%'
		},
		[theme.breakpoints.up('md')]: {
			width: '23%'
		}
	},
	button_link: {
		display: 'block',
		width: '100%',
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
		border: '1px solid rgba(0,0,0,.2)'
	},
	row: {
		'& td, & th': {
			padding: '4px 24px 4px 24px',
			width: '35%'
		},
		'& *': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	numberCell: {
		width: 50
	},
	flexCell: {
		display: 'flex',
		'& span': {
			alignSelf: 'center'
		}
	},
	rightCell: {
		textAlign: 'right'
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	expDetails: {
		margin: '0 2rem',
		fontSize: '1.5rem'
	},
	expSummary: {
		fontSize: '1.5rem'
	}
});

class MatchesList extends Component {
	componentDidMount = () => {
		this.props.getSubtourGames(this.props.id);
	};

	render() {
		const { classes } = this.props;
		const { matches } = this.props.tournaments;
		let matchesList;

		if (matches) {
			matchesList = matches.map((match, i) => (
				<div key={match.date + i}>
					<h2
						style={{
							textAlign: 'center',
							fontSize: '2rem',
							color: 'rgba(0,0,0,0.8)',
							background: 'rgba(67, 160, 71, 0.1)',
							padding: match.date ? '2rem 0' : '',
							borderRadius: 10
						}}
					>
						{match.date}
					</h2>
					<Table className={classes.table}>
						<TableBody>
							{match.games.map((game) => (
								<TableRow
									key={game.game_id}
									className={classes.row}
									onClick={this.props.onGameClickHandler.bind(this, game.game_id)}
									hover
									style={{ cursor: 'pointer' }}
								>
									<TableCell component="th" scope="row">
										<div className={classes.flexCell} style={{ justifyContent: 'flex-end' }}>
											<span>{game.in.title}</span>
											<img src={game.in.logo} alt="" style={{ height: 50, marginLeft: 8 }} />
										</div>
									</TableCell>
									<TableCell
										scope="row"
										style={{
											textAlign: 'center',
											width: '20%'
										}}
									>
										{game.score}
									</TableCell>
									<TableCell component="th" scope="row">
										<div className={classes.flexCell}>
											<img src={game.out.logo} alt="" style={{ height: 50, marginRight: 8 }} />
											<span>{game.out.title}</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			));
		}

		return (
			<div>
				{/* <div className={classes.root}>
				</div> */}
				{matchesList}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	tournaments: state.tournaments
});

export default compose(withStyles(styles), connect(mapStateToProps, { getSubtourGames }))(MatchesList);
