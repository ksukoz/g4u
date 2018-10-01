import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import { getAppoints } from '../../actions/tournamentActions';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
const styles = (theme) => ({
	button_link: {
		display: 'block',
		width: '100%',
		color: '#000',
		textDecoration: 'none',
		transition: '.3s'
	},
	listItem: {
		border: '1px solid rgba(0,0,0,.2)',
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
	container: {
		padding: '1rem 10%'
	}
});

class Appointments extends Component {
	state = {
		open: false,
		matchesList: null
	};

	componentDidMount = () => {
		this.props.getAppoints();
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.tournaments.matches !== null) {
			this.setState({
				...this.state,
				matchesList: nextProps.tournaments.matches
			});
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				{' '}
				<List>
					{this.state.matchesList !== null ? (
						this.state.matchesList.map((match) => (
							<Link className={classes.button_link} to={`/appointgame/${match.game.id}`} key={match.id}>
								<MenuItem className={classes.listItem} value={match.id}>
									{`${match.game.in.title} : ${match.game.out.title}`}
								</MenuItem>
							</Link>
						))
					) : (
						''
					)}
				</List>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	tournaments: state.tournaments,
	errors: state.errors,
	messages: state.messages
});

export default compose(withStyles(styles), connect(mapStateToProps, { getAppoints }))(Appointments);
