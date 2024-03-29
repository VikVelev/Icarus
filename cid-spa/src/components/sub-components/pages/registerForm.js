import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { Link, Redirect }  from 'react-router-dom'
import { register } from '../../../actions/userActions';
import { connect } from 'react-redux';

import lang from '../../../lang.js'
@connect((store) => {
	return {
        user: store.userManagement,
        lang: store.langManagement.lang,
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

    handleErrors(type) {
        if (this.props.user.error.data !== undefined) {
            if (this.props.user.error.data[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {this.props.user.error.data[type]}
                    </Message>
                )
            }
        }
	}

    handleChange = (e, { name, value}) => {
		this.setState({ [name]: value })
	}

    handleSubmit = () => {
        const { username, email, password, password2 } = this.state
        //check for custom validation here
        this.props.dispatch(register(username, email, password, password2))
    }

    render() {
        let text = lang[this.props.lang].registerPage

        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Header as='h2' color='blue' textAlign='center'>
							<Image src='/img/logo.png' href="/"/>
                            {' '}{text.title}
                        </Header>

                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    error={this.handleErrors("username") !== undefined}
                                    name="username"
									value={this.state.username}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    placeholder={text.username_p}
                                />
                                {this.handleErrors("username")}                    
                                <Form.Input
                                    fluid
                                    icon='at'
                                    error={this.handleErrors("email") !== undefined}
                                    name="email"
									value={this.state.email}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    placeholder={text.email_p}
                                />
                                {this.handleErrors("email")}                                 
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name="password"
                                    error={this.handleErrors("password") !== undefined}                           
									value={this.state.password}
									onChange={this.handleChange}
                                    iconPosition='left'
                                    type='password'                                    
                                    placeholder={text.password_p}
                                />
                                {this.handleErrors("password")}                                 
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    error={this.handleErrors("password_confirm") !== undefined}                                                                        
                                    name="password2"
									value={this.state.password2}
									onChange={this.handleChange}
                                    placeholder={text.password2_p}
                                    type='password'
                                />
                                {this.handleErrors("password_confirm")}                                 
                                {/* <Form.Field>
                                    <Checkbox 
                                        toggle={this.state.agreed} 
                                        name="agreed" 
                                        onChange={this.handleChange} 
                                        label={<label> I agree to the <a href="/terms">terms and conditions</a>.</label>} />
                                </Form.Field> */}
                                <Button type='submit 'color='blue' fluid size='large'>{text.b_SignUp}</Button>
                            </Segment>
                            { this.props.user.redirecting ? <Redirect to="/login#successful"/> : null }
                        </Form>
                        <Message>
                            {text.footer + " "}<Link to="login">{text.footerLink}</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default RegisterForm