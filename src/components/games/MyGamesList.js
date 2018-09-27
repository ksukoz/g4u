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

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import { getCurrentGamesList, getFutureGamesList } from '../../actions/gameActions';

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
		margin: '0 2rem',
		padding: 0,
		[theme.breakpoints.up('md')]: {
			fontSize: '1.5rem'
		}
	},
	expSummary: {
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
		background: 'transparent',
		border: '1px solid #43A047',
		color: 'rgba(0,0,0,.5)',
		borderRadius: 40,
		transition: '.3s',
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
	}
});

class MyGamesList extends Component {
	componentDidMount = () => {
		this.props.type === 'future' ? this.props.getFutureGamesList() : this.props.getCurrentGamesList();
	};

	render() {
		const { classes } = this.props;
		const { currentGamesList, futureGamesList } = this.props.games;

		let gameList;

		if (this.props.type === 'current' && currentGamesList) {
			gameList = currentGamesList.map((game) => (
				<Link to={`/game/${game.game_id}`} className={classes.link} key={game.game_id}>
					<MenuItem className={classes.listItem} key={game.game_id}>
						<span>{game.inTitle}</span>
						<strong>{game.score}</strong>
						<span>{game.outTitle}</span>
					</MenuItem>
				</Link>
			));
		} else if (this.props.type === 'future' && futureGamesList) {
			gameList = futureGamesList.map((game) => (
				<Link to={`/game/${game.game_id}`} className={classes.link} key={game.game_id}>
					<MenuItem className={classes.listItem} key={game.game_id}>
						<span>{game.inTitle}</span>
						<strong>{game.score}</strong>
						<span>{game.outTitle}</span>
					</MenuItem>
				</Link>
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

export default compose(withStyles(styles), connect(mapStateToProps, { getCurrentGamesList, getFutureGamesList }))(
	MyGamesList
);
