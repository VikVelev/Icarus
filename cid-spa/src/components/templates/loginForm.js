import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'

const LoginForm = () => (
	<div className='login-form'>
		<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>

				<Header as='h2' color='blue' textAlign='center'>
					<Image src='/img/logo.png' />
					{' '}Log into your account
				</Header>

				<Form size='large'>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='Username'
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
						/>

						<Button color='blue' fluid size='large'>Log in</Button>
					</Segment>
				</Form>
				<Message>
					Don't have an account? <Link to="register">Sign up</Link>
				</Message>
			</Grid.Column>
		</Grid>
	</div>
)

export default LoginForm