import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Button, Container, Divider, Grid, Header, Sidebar } from 'semantic-ui-react'
import { Icon, Image, Menu, Responsive, Segment } from 'semantic-ui-react'

const HomepageHeading = ({ mobile }) => (
	<Container text>

		<Header as='h1' content='CiD' inverted
			style={{
				fontSize: mobile ? '2em' : '4em',
				fontWeight: 'normal',
				marginBottom: 0,
				marginTop: mobile ? '1.5em' : '3em',
			}}
		/>

		<Header as='h2' content='Collaboration in 3D Design made easier.' inverted
			style={{
				fontSize: mobile ? '1.5em' : '1.7em',
				fontWeight: 'normal',
				marginTop: mobile ? '0.5em' : '1.5em',
			}}
		/>

		<Button primary size='huge'>
			Get Started
			<Icon name='right arrow' />
		</Button>

  	</Container>
)

HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
	state = {}

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })

	render() {
		const { children } = this.props
		const { fixed } = this.state

		return (
		<Responsive {...Responsive.onlyComputer} minWidth={768}>
				<Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
					
					<Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large'>
						<Container>

							<Menu.Item as='a' active>Home</Menu.Item>
							<Menu.Item as='a'>About</Menu.Item>
							<Menu.Item position='right'>
								<Button as='a' inverted={!fixed}>Log in</Button>
								<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
							</Menu.Item>
							
						</Container>
					</Menu>

					<HomepageHeading />
				</Segment>
			{children}
		</Responsive>
		);
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node,
}

class MobileContainer extends Component {
	state = {}

	handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

	render() {
		const { children } = this.props
		const { sidebarOpened } = this.state

		return (
		<Responsive {...Responsive.onlyMobile} minWidth={0}>
			<Sidebar.Pushable>
				<Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
					<Menu.Item as='a' active>Home</Menu.Item>
					<Menu.Item as='a'>Feed</Menu.Item>
					<Menu.Item as='a'>About</Menu.Item>

					<Menu.Item as='a'>Log in</Menu.Item>
					<Menu.Item as='a'>Sign Up</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handleToggle} style={{ minHeight: '100vh' }}>
					<Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>

						<Container>
							<Menu inverted pointing secondary size='large'>
								<Menu.Item onClick={this.handleToggle}>
									<Icon name='sidebar' />
								</Menu.Item>
								<Menu.Item position='right'>
									<Button as='a' inverted>Log in</Button>
									<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
								</Menu.Item>
							</Menu>
						</Container>
						<HomepageHeading mobile />
						
					</Segment>
					{children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Responsive>
		)
	}
}

MobileContainer.propTypes = {
	children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
	<div>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>

	<Segment style={{ padding: '8em 0em' }} vertical>
	  	<Grid container stackable verticalAlign='middle'>
			<Grid.Row>

				<Grid.Column width={8}>
					<Header as='h3' style={{ fontSize: '2em' }}>We Do Amazing Stuff</Header>
					<p style={{ fontSize: '1.33em' }}>
						Eiusmod ut excepteur adipisicing id est minim adipisicing.
						Eiusmod ut excepteur adipisicing id est minim adipisicing.						
					</p>

					<Header as='h3' style={{ fontSize: '2em' }}>We Do Other Amazing Stuff</Header>
					<p style={{ fontSize: '1.33em' }}>
						Adipisicing laborum irure deserunt commodo nostrud est est.
						Lorem veniam cillum eu nulla officia.
					</p>
				</Grid.Column>

				<Grid.Column floated='right' width={6}>
					<Image rounded
					size='large'
					src='../../../img/trex.png'
					/>
				</Grid.Column>

			</Grid.Row>

			<Grid.Row>

				<Grid.Column textAlign='center'>
					<Button size='huge'>Do I Even Care?</Button>
				</Grid.Column>

			</Grid.Row>
	 	</Grid>
	</Segment>

	<Segment style={{ padding: '0em' }} vertical>
		<Grid celled='internally' columns='equal' stackable>
			<Grid.Row textAlign='center'>

		  		<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
					<Header as='h3' style={{ fontSize: '2em' }}>"Meshes everywhere"</Header>
					<p style={{ fontSize: '1.33em' }}>That is the problem.</p>
		  		</Grid.Column>

		  		<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>

					<Header as='h3' style={{ fontSize: '2em' }}>"I can do meth now."</Header>
					
					<p style={{ fontSize: '1.33em' }}>
						<b>IGN</b> 10/10
					</p>

		  		</Grid.Column>

			</Grid.Row>
	  	</Grid>
	</Segment>
	
	<Segment style={{padding: '8em 0em'}} vertical>
		<Container>
			<Header as='h3' style={{ fontSize: '3em', align: 'center' }}>Amazing Demo Of The Viewport Here</Header>
		</Container>
	</Segment>
	
	<Segment style={{ padding: '8em 0em' }} vertical>
		<Container text>

			<Header as='h3' style={{ fontSize: '2em' }}>Amazing Title 2</Header>

			<p style={{ fontSize: '1.33em' }}>
				Anim sint velit proident Lorem. Ipsum consequat dolore reprehenderit Lorem adipisicing dolore id in. Commodo qui id ut occaecat occaecat aute ipsum Lorem. Nostrud sit ex id velit ea.
			</p>

			<Button as='a' size='large'>Read More</Button>

			{/*------------------------------------------------------------*/}
			<Divider as='h4' className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
		  		<a href='/'>More amazing stuff</a>
			</Divider>
			{/*------------------------------------------------------------*/}

			<Header as='h3' style={{ fontSize: '2em' }}>Amazing Title 2</Header>

			<p style={{ fontSize: '1.33em' }}>
				Culpa dolore qui eiusmod magna ad occaecat Lorem minim sunt nisi deserunt occaecat. Ex ipsum proident irure velit incididunt pariatur dolor. Nisi pariatur cupidatat quis aliquip dolor culpa sunt aliqua deserunt excepteur ad. Reprehenderit irure nulla fugiat Lorem eu anim commodo ullamco veniam ullamco.
			</p>

			<Button as='a' size='large'>Read More</Button>

	  </Container>
	</Segment>
  </ResponsiveContainer>
)

export default HomepageLayout