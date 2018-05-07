import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Link }  from 'react-router-dom'

import { Button, Container, Grid, Header } from 'semantic-ui-react'
import { Icon, Image, Menu, Responsive, Segment, List } from 'semantic-ui-react'
import { Visibility } from 'semantic-ui-react'

import { changePages } from '../../../actions/pageActions.js'

import Canvas3D from './../../viewport/canvas3d.js'
import { connect } from 'react-redux';

import lang from '../../../lang.js'

@connect((store) => {
	return{
		lang: store.langManagement,
	}
})
class HomepageHeading extends Component {
	constructor(props){
		super(props)
		this.mobile = props.mobile
	}

	render(){
		return(
			<Container text>

			<Header as='h1' content='CiD' inverted
				style={{
					fontSize: this.mobile ? '2em' : '4em',
					fontWeight: 'normal',
					marginBottom: 0,
					marginTop: this.mobile ? '1.5em' : '3em',
					zIndex: 100,
				}}
			/>

			<Header as='h2' content='Collaboration in 3D Design made easier.' inverted
				style={{
					fontSize: this.mobile ? '1.5em' : '1.7em',
					fontWeight: 'normal',
					marginTop: this.mobile ? '0.5em' : '1.5em',
				}}
			/>

			<Button as={ Link } to="login" primary size='huge'>
				Get Started
				<Icon name='right arrow' />
			</Button>

			</Container>
		)
	}
	
}

HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
}

@connect((store) => {
	return{
		page: store.pageManagement,
		lang: store.langManagement,
	}
})
class DesktopContainer extends Component {

	state = {}

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })

	clickHandler(object) {
		this.props.dispatch(changePages(object.target.name))
	}

	render() {
		const { children } = this.props
		const { fixed } = this.state

		return (
		<Responsive {...Responsive.onlyComputer} minWidth={768}>

				<video style={{ minHeight: 700 }} autoPlay muted loop preload="auto" className="hero-video">
					<source src="/img/hero.mp4" type="video/mp4"/>
				</video>
				<Segment id="hero" textAlign='center' style={{ minHeight: 678, padding: '1em 0em', zIndex: 1}} vertical>
					<Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large'
						style={{
							borderWidth: 0,
							borderColor: 'none',
							zIndex: '1',
						}}>

						<Container>

							<Menu.Item as='a'>{lang[this.props.lang.lang].n_Home}</Menu.Item>
							<Menu.Item as='a' href="#demo_header">Demo</Menu.Item>
							<Menu.Item position='right'>

								<Button as={Link}
										to="/login"
										name="login"										
										inverted={!fixed}
										>Log in</Button>

								<Button as={Link}
										to="/register"
										name="register"										
										inverted={!fixed} 
										primary={fixed} 									
										style={{ marginLeft: '0.5em' }}
										>Sign Up</Button>

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

	render() {
		const { children } = this.props
		return (
		<Responsive {...Responsive.onlyMobile} minWidth={0}>
			<Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>

				<Container>
					<Menu inverted pointing secondary size='large'>
						<Menu.Item position='right'>
							<Button as={Link} to="/login" inverted>Log in</Button>
							<Button as={Link} to="/register" inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
						</Menu.Item>

					</Menu>
				</Container>
				<HomepageHeading mobile />
				
				</Segment>
				{children}
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
@connect((store) => {
	return{
		lang: store.langManagement,
	}
})
class HomepageLayout extends Component {
	render() {
		return(
			<ResponsiveContainer>
				<Segment style={{ padding: '8em 0em' }} vertical>
					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>

							<Grid.Column width={8}>
								<Header as='h3' style={{ fontSize: '2em' }}>Keep in track of your changes</Header>
								<p style={{ fontSize: '1.33em' }}>
									Be able to keep track of every change made to every model with the provided version control system.
									One of the first dedicated specifically to the 3D industry.					
								</p>

								<Header as='h3' style={{ fontSize: '2em' }}>Accessible and fast</Header>
								<p style={{ fontSize: '1.33em' }}>
									Providing fast, reliable and responsive viewport for viewing your 3D models in the web, on the go from your phone or anywhere you want.
								</p>
							</Grid.Column>

							<Grid.Column floated='right' width={6}>
								<Image rounded
								size='large'
								src='/img/trex.png'
								/>
							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>

				<Segment style={{ padding: '0em' }} vertical>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header as='h3' style={{ fontSize: '2em' }}>"MyProject000001a.obj"</Header>
								<p style={{ fontSize: '1.33em' }}>We've experienced it too.</p>
							</Grid.Column>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>

								<Header as='h3' style={{ fontSize: '2em' }}>"This is what I needed."</Header>
								
								<p style={{ fontSize: '1.33em' }}>
									<b>CGMEETUP</b>
								</p>

							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>
				

				<Header as='h3' id="demo_header" style={{ fontSize: '3em', align: 'center', alignText: 'center' }}>Test it yourself </Header>
				
				<Segment style={{ height: "600px"}} vertical id="demo">
					<Visibility style={{ height: '100%' }} onOnScreen={console.log("Render Canvas")}>
						<Canvas3D modelPath="/models/aventador/Avent.obj" texturePath="/models/aventador/Avent.mtl"/>
					</Visibility>
				</Segment>
				
				<Grid centered style={{padding: '2em'}}>
				<Segment style={{ padding: '8em' }} vertical>
					<Button id="get_started" as={ Link } to="login" primary size='huge'>
						Get Started
						<Icon name='right arrow' />
					</Button>
				</Segment>
				</Grid>

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
												<Header as='h4' inverted>CiD</Header>
												<p>{lang["bg"].heroText}</p>
											</Grid.Column>

										</Grid.Row>
									</Grid>
								</Container>
							</Segment>
						</Responsive>
			</ResponsiveContainer>
		)
	}
}

export default HomepageLayout