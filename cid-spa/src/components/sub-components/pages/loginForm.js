import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../../actions/userActions'
import { changePages } from '../../../actions/pageActions';

@connect((store) => {
	return {
		page: store.pageManagement,
		user: store.userManagement
	}
})
export class LoginForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			loggingIn: false,
		}

	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

	handleSubmit = () => {
		const { username, password } = this.state
		this.setState({ loggingIn: true })
		this.setState({ name: username, password: password })
		this.props.dispatch(login(username, password))
		this.props.dispatch(changePages(""))
	}

	registerSuccess(){
		return <Message positive>Your registration has been successful. You can now log in.</Message>
	}

    handleErrors(type) {
        if (this.props.user.error[type] !== undefined) {
			this.setState({ loggingIn: false })
			return (
				<Message attached="bottom" color="red">
					{this.props.user.error[type]}
				</Message>
			)
        }
	}

	render() {
		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>

						<Header as='h2' color='blue' textAlign='center'>
							<Image src='/img/logo.png' href="/"/>
							{' '}Log into your account
						</Header>

						<Form size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									error={this.handleErrors("username") !== undefined}
									fluid
									icon='user'
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
									iconPosition='left'
									placeholder='Username'
								/>	
								{this.handleErrors("username")}
								<Form.Input
									error={this.handleErrors("password") !== undefined}								
									fluid
									icon='lock'
									name="password"
									value={this.state.password}
									onChange={this.handleChange}							
									iconPosition='left'
									placeholder='Password'
									type='password'
								/>
								{this.handleErrors("password")}
								<Button 
									loading={this.props.user.error !== undefined && this.state.loggingIn}
									type='submit' 
									color='blue' 
									fluid 
									size='large'>Log in</Button>
							</Segment>
						</Form>
						{this.handleErrors("non_field_errors")}
						{
							this.props.page.currentPage === 'login#successful' ? 
							this.registerSuccess() : 
							<Message>
								Don't have an account? <Link to="register">Sign up</Link>
							</Message> 
						}
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export const LoggedIn = () => (
	<div>Already logged in</div>
)