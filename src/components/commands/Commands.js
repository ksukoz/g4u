import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getCommands } from '../../actions/commandActions';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';

import SearchIcon from '@material-ui/icons/Search';
import { Paper } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	form: {
		width: '49%'
	},
	media: {
		width: '49%'
	},
	img: {
		width: '100%'
	},
	input: {
		width: '100%',
		marginBottom: '2rem',
		'& label, & input': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		}
	},
	button: {
		margin: theme.spacing.unit,
		background: 'transparent',
		color: 'rgba(0,0,0,.5)',
		transition: '.3s',
		'&:hover, &:active': {
			backgroundColor: '#43A047',
			color: '#fff'
		}
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		color: '#fff'
	},
	editor: {
		margin: '1rem 0'
	},
	listItem: {
		borderBottom: '1px solid rgba(0,0,0,.2)',
		height: 'auto'
	},
	list: {
		width: '100%',
		'& *': {
			[theme.breakpoints.up('md')]: {
				fontSize: '1.5rem'
			}
		},
		'& a': {
			textDecoration: 'none'
		}
	},
	paper: {
		padding: '2rem',
		marginBottom: '2rem'
	},
	container: {
		padding: '1rem 10%'
	}
});

class Commands extends Component {
	state = {
		search: ''
	};

	onChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	componentDidMount = () => {
		this.props.getCommands();
	};

	render() {
		const { classes } = this.props;
		const { commands } = this.props.commands;
		let myCommandsList;
		let favoriteCommandsList;
		let allCommandsList;

		if (this.props.commands && commands) {
			myCommandsList = commands.my.map((command) => (
				<Link to={`/commands/${command.cId}`} key={command.cId}>
					<MenuItem className={classes.listItem}>
						<img src={command.logo} alt="" style={{ width: 100, height: 100, marginRight: 8 }} />
						{command.title}
					</MenuItem>
				</Link>
			));

			favoriteCommandsList = commands.liked.map((command) => (
				<Link to={`/commands/${command.cId}`} key={command.cId}>
					<MenuItem className={classes.listItem}>
						<img src={command.logo} alt="" style={{ width: 50, marginRight: 8, maxHeight: 50 }} />
						{command.title}
					</MenuItem>
				</Link>
			));

			allCommandsList = commands.all.map((command) => (
				<Link to={`/commands/${command.cId}`} key={command.cId}>
					<MenuItem className={classes.listItem}>
						<img src={command.logo} alt="" style={{ width: 50, marginRight: 8, maxHeight: 50 }} />
						{command.title}
					</MenuItem>
				</Link>
			));
		}

		return (
			<div className={classes.container}>
				<TextField
					className={classes.input}
					type="text"
					name="search"
					value={this.state.search}
					onChange={this.onChange}
					onInput={(e) => {
						e.target.value = e.target.value;
					}}
					label="Поиск"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						)
					}}
				/>
				<Paper className={classes.paper}>
					<h2>Мои команды</h2>
					<List className={classes.list}>{myCommandsList}</List>
				</Paper>
				<Paper className={classes.paper}>
					<h2>Любимые команды</h2>
					<List className={classes.list}>{favoriteCommandsList}</List>
				</Paper>
				<Paper className={classes.paper}>
					<h2>Команды</h2>
					<List className={classes.list}>{allCommandsList}</List>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	commands: state.commands
});

export default compose(withStyles(styles), connect(mapStateToProps, { getCommands }))(Commands);
