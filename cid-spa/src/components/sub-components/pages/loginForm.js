import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../../actions/userActions'
import { changePages } from '../../../actions/pageActions';

import lang from '../../../lang.js'
@connect((store) => {
	return {
		page: store.pageManagement,
		user: store.userManagement,
		lang: store.langManagement.lang,
	}
})
export class LoginForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			loggingIn: false,
			error: false,
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

	registerSuccess(text){
		return <Message positive>{text.registerSuccess}</Message>
	}

	handleError(type){
		return (
			<Message attached="bottom" color="red">
				{this.props.user.error[type]}
			</Message>
		)
	}

    handleErrors(type) {
        if (this.props.user.error[type] !== undefined) {
			this.setState({ loggingIn: false })
			this.setState({ error: true })			
        }
	}

	render() {

		let text = lang[this.props.lang].loginPage
		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>

						<Header as='h1' color='blue' textAlign='center'>
							<Image src='/img/LogoBlue.png'style={{margin: "auto"}}  href="/"/>
							{' ' + text.title}
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
									placeholder={text.username_p}
								/>	

								<Form.Input
									error={this.handleErrors("password") !== undefined}								
									fluid
									icon='lock'
									name="password"
									value={this.state.password}
									onChange={this.handleChange}							
									iconPosition='left'
									placeholder={text.password_p}
									type='password'
								/>

								<Button 
									loading={this.props.user.error !== undefined && this.state.loggingIn}
									type='submit' 
									color='blue' 
									fluid 
									size='large'>{text.b_LogIn}</Button>
							</Segment>
						</Form>
						
						{ this.state.loggingIn ? this.handleErrors("non_field_errors") : null }
						{ this.state.error ? this.handleError("non_field_errors") : null }					
						{
							this.props.page.currentPage === 'login#successful' ? 
							this.registerSuccess(text) : 
							<Message>
								{text.footer + " "}<Link to="register">{text.footerLink}</Link>
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