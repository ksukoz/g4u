import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CommandsList from './CommandsList';

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
			padding: '4px 24px 4px 24px'
		},
		'& td:first-child, & th:first-child': {
			padding: '4px 15px',
			width: 'max-content'
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

class InfoSubTour extends Component {
	state = {
		value: 0
	};

	handleChange = (e, value) => {
		this.setState({ ...this.state, value });
	};

	onClickHandler = (commId) => {
		this.props.history.push(`/command/${this.props.match.params.id}:${commId}`);
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Tabs style={{ marginBottom: '2rem' }} value={this.state.value} onChange={this.handleChange} centered>
					<Tab value={0} label="Информация" />
					<Tab value={1} label="Матчи" />
					<Tab value={2} label="Игроки" />
				</Tabs>
				<Button
					size="large"
					className={classes.button}
					style={{ marginBottom: '1rem' }}
					onClick={() => this.props.history.goBack()}
				>
					Назад
				</Button>

				{this.state.value === 0 && (
					<CommandsList id={this.props.match.params.id} onClickHandler={this.onClickHandler} />
				)}
				{/* {this.state.value === 1 && <AppontGame id={this.props.match.params.id} />}
				{this.state.value === 1 && <AppontGame id={this.props.match.params.id} />} */}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	tournaments: state.tournaments
});

export default compose(withStyles(styles), connect(mapStateToProps, null))(InfoSubTour);
