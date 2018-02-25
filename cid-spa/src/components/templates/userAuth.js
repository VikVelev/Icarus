import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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

						<Button color='blue' fluid size='large'>Login</Button>
					</Segment>
				</Form>
				<Message>
					Don't have an account? <a onClick={ShowRegister}>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	</div>
)

function ShowRegister() {
	console.log("register")
}

export default LoginForm