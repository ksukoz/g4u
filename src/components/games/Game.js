import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import AppontGame from '../appointments/AppointGame';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GameInfo from './GameInfo';

const styles = (theme) => ({
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
	listItem: {
		borderBottom: '1px solid rgba(0,0,0,.2)',
		'& strong': {
			padding: '0 2rem'
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	listItemPlayers: {
		display: 'flex',
		justifyContent: 'space-between',
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
	tablesWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	tablesCol: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '49%'
		}
	},
	tablesColStat: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '50%'
		}
	},
	colorWrap: {
		display: 'flex'
	},
	colorBlock: {
		width: 15,
		height: 15,
		border: '1px solid rgba(0,0,0,.5)',
		borderRadius: 5,
		margin: '0 10px'
	},
	listItemCommands: {
		marginBottom: 30,
		borderRadius: 5,
		fontSize: '1.5rem',
		'& strong': {
			padding: '0 10px'
		},
		'&:hover': {
			filter: 'brightness(2)'
		}
	},
	paper: {
		marginBottom: '2rem',
		'& ul': {
			padding: ' 0 2rem'
		}
	},
	matchesList: {
		padding: '15px 2rem!important'
	},
	tabs: {
		marginBottom: '2rem',
		backgroundColor: '#43A047',
		color: '#fff',
		boxShadow:
			'0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',

		'& div + span': {
			backgroundColor: '#fff'
		}
	},
	tab: {
		width: '30%',
		'& span': {
			fontSize: '1.5rem'
		}
	}
});

class Game extends Component {
	state = {
		value: 0
	};

	handleChange = (e, value) => {
		this.setState({ ...this.state, value });
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Tabs
					className={classes.tabs}
					style={{ marginBottom: '2rem' }}
					value={this.state.value}
					onChange={this.handleChange}
					centered
				>
					<Tab className={classes.tab} value={0} label="Информация" />
					<Tab className={classes.tab} value={1} label="Трансляция" />
				</Tabs>
				{this.state.value === 0 && <GameInfo id={this.props.match.params.id} />}
				{this.state.value === 1 && <AppontGame id={this.props.match.params.id} />}
			</div>
		);
	}
}

export default compose(withStyles(styles))(Game);
