import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../../actions/userManagementActions'
import { changePages } from '../../../actions/pageManagementActions';

@connect((store) => {
	return {
		user: store.userManagement
	}
})
export class LoginForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleSubmit = () => {
		const { username, password } = this.state
		this.setState({ name: username, password: password })
		this.props.dispatch(changePages("/"))
		this.props.dispatch(login(username, password))
	}

	handleErrors() {
		if(Object.keys(this.props.user.error).length !== 0) {
			return (
				<Message error>
					{this.props.user.error.non_field_errors ? this.props.user.error.non_field_errors[0] : null }
					{this.props.user.error.username ? "Username: " + this.props.user.error.username : null }<br/>
					{this.props.user.error.password ? "Password: " + this.props.user.error.password : null }					
				</Message>
			)
		}
	}

	render() {

		console.log()
		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>

						<Header as='h2' color='blue' textAlign='center'>
							<Image src='/img/logo.png' />
							{' '}Log into your account
						</Header>

						<Form size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									error={this.props.user.error.username !== undefined}
									fluid
									icon='user'
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
									iconPosition='left'
									placeholder='Username'
								/>
								<Form.Input
									error={this.props.user.error.password !== undefined}								
									fluid
									icon='lock'
									name="password"
									value={this.state.password}
									onChange={this.handleChange}							
									iconPosition='left'
									placeholder='Password'
									type='password'
								/>

								<Button type='submit' color='blue' fluid size='large'>Log in</Button>
							</Segment>
						</Form>
						{this.handleErrors()}
						<Message>
							Don't have an account? <Link to="register">Sign up</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export const LoggedIn = () => (
	<div>Already logged in</div>
)