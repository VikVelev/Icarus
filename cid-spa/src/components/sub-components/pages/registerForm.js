import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'
import { register } from '../../../actions/userManagementActions';
import { connect } from 'react-redux';

@connect((store) => {
	return {
		user: store.userManagement
	}
})

class RegisterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            agreed: false,
		}

    }

    handleCustomErrors(){
        var errorString = ""

        if (this.state.password !== this.state.password2){
            errorString += "Passwords are not matching. \n"
        }
        if (this.state.email === "") {
            errorString += " Email may not be blank."
        }
        console.log(errorString)

        return errorString
    }
    
    handleErrors() {
        // TODO: Fix the validation
		if(Object.keys(this.props.user.error).length !== 0) {
			return (
				<Message error>
					{ this.props.user.error.non_field_errors ? this.props.user.error.non_field_errors : null }
					{ this.props.user.error.username ? this.props.user.error.username : null }
                    { this.props.user.error.email ? <br/> : null } 
					{ this.props.user.error.email ? this.props.user.error.email : null }
                    { this.props.user.error.password ? <br/> : null }    
                    { this.props.user.error.password ? "Password: " + this.props.user.error.password : null }
                    { this.handleCustomErrors ? <br/> : null }                        
                    { this.handleCustomErrors ? this.handleCustomErrors() : null } 			
				</Message>
			)
		}
	}

    handleChange = (e, { name, value}) => {
		this.setState({ [name]: value })
	}

    handleSubmit = () => {
        const { username, email, password, password2 } = this.state
        //check for custom validation here
        this.setState({ name: username, email: email, password1: password, password2: password2 })
        this.props.dispatch(register(username, email, password, password2))
    }

    render() {
        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Header as='h2' color='blue' textAlign='center'>
                            <Image src='/img/logo.png' />
                            {' '}Create a new account
                        </Header>

                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    error={this.props.user.error.username !== undefined}
                                    name="username"
									value={this.state.username}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    placeholder='Enter username'
                                />
                                <Form.Input
                                    fluid
                                    icon='at'
                                    error={this.props.user.error.email !== undefined}
                                    name="email"
									value={this.state.email}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    placeholder='Enter e-mail'
                                />					
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name="password"
                                    error={this.props.user.error.password !== undefined}                           
									value={this.state.password}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    placeholder='Enter password'
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    error={this.props.user.error.password !== undefined}                                                                        
                                    name="password2"
									value={this.state.password2}
									onChange={this.handleChange}
                                    placeholder='Confirm password'
                                    type='password'
                                />
                                <Form.Field>
                                    <Checkbox 
                                        toggle={this.state.agreed} 
                                        name="agreed" 
                                        onChange={this.handleChange} 
                                        label={<label> I agree to the <a href="/terms">terms and conditions</a>.</label>} />
                                </Form.Field>
                                <Button type='submit 'color='blue' fluid size='large'>Sign up</Button>
                            </Segment>
                        </Form>
                        {this.handleErrors()}
                        <Message>
                            Already have an account? <Link to="login">Log in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default RegisterForm