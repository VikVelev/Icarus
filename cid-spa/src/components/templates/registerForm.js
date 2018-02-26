import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react'

import { Link }  from 'react-router-dom'

class RegisterForm extends Component {

    state = {
        checked: false, 
        errors: "none",
        valdation: "none",
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked })
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

                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Enter username'
                                />
                                <Form.Input
                                    fluid
                                    icon='at'
                                    iconPosition='left'
                                    placeholder='Enter e-mail'
                                />					
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Enter password'
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm password'
                                    type='password'
                                />
                                <Form.Field>
                                    <Radio
                                        label='I agree to the '
                                        onClick={this.toggle}
                                        checked={this.state.checked}
                                        />
                                    <Link to="conditions"> terms and conditions</Link>
                                </Form.Field>
                                <Button color='blue' fluid size='large'>Sign up</Button>
                            </Segment>
                        </Form>
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