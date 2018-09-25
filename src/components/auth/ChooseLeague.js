import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { getLeagues, setLeagues } from '../../actions/leagueActions';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
	root: {
		width: 'max-content',
		margin: '0 auto',
		textAlign: 'center',
		marginTop: '15vh',
		padding: '2rem 10%'
	},
	input: {
		width: 300,
		marginBottom: '1rem'
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		width: 300,
		color: '#fff',
		marginBottom: '2rem'
	},
	link: {
		textDecoration: 'none',
		color: '#000',
		transition: '.3s',
		'&:hover': {
			color: 'rgba(0,0,0,.8)'
		}
	},
	error: {
		color: '#ff5e5e',
		paddingBottom: '2rem'
	}
};
class ChooseLeague extends Component {
	state = {
		league: '',
		error: ''
	};

	onChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = (e) => {
		e.preventDefault();

		if (this.state.league.length > 0) {
			const leagueId = {
				league_id: this.state.league
			};

			this.props.setLeagues(leagueId, this.props.history);
		} else {
			this.setState({
				...this.state,
				error: 'Необходимо выбрать лигу'
			});
		}
	};

	componentWillMount() {
		this.props.getLeagues();
	}

	render() {
		const { classes } = this.props;
		const { leaguesList } = this.props.leagues;
		let leaguesOptions;
		if (leaguesList !== null) {
			leaguesOptions = leaguesList.map((league) => (
				<MenuItem key={league.id} value={league.id}>
					{league.title}
				</MenuItem>
			));
		}

		return (
			<div className={classes.root}>
				<form onSubmit={this.onSubmitHandler}>
					<div>
						<FormControl className={classes.input}>
							<InputLabel htmlFor="sport-type" className={classes.select}>
								Выбрать вид спорта
							</InputLabel>
							<Select
								className={classes.select}
								disabled
								value="football"
								onChange={this.onChangeHandler}
								displayEmpty
								inputProps={{
									name: 'sport-type',
									id: 'sport-type'
								}}
							>
								<MenuItem value="football">Футбол</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.input}>
							<InputLabel htmlFor="league" className={classes.select}>
								Выбрать лигу
							</InputLabel>
							<Select
								className={classes.select}
								value={this.state.league}
								onChange={this.onChangeHandler}
								displayEmpty
								inputProps={{
									name: 'league',
									id: 'league'
								}}
							>
								{leaguesOptions}
							</Select>
						</FormControl>
					</div>
					<Button variant="contained" type="submit" className={classes.submit}>
						Сохранить
					</Button>
					<div className={classes.error}>
						<small variant="caption" component="small">
							{this.state.error}
						</small>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	leagues: state.leagues,
	errors: state.errors
});

export default compose(withStyles(styles), connect(mapStateToProps, { getLeagues, setLeagues }))(ChooseLeague);
