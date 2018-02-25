import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react'
import { List, Responsive, Segment } from 'semantic-ui-react'

export default class Footer extends Component {
    render(){
        return(
        <Responsive>
           <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>

                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <Header as='h4' inverted>Footer Header</Header>
                                <p>CiD - 3D Collaboration Made Easier.</p>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
          </Responsive>
        );
    }
}
