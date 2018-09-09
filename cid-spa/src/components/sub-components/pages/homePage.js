import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Link }  from 'react-router-dom'

import { Button, Container, Grid, Header } from 'semantic-ui-react'
import { Icon, Image, Menu, Responsive, Segment, List } from 'semantic-ui-react'
import { Visibility } from 'semantic-ui-react'

import { changePages } from '../../../actions/pageActions.js'

import Canvas3D from './../../viewport/canvas3d.js'
import { connect } from 'react-redux'

import lang from '../../../lang.js'

import "animate.css/animate.min.css"
import ScrollAnimation from "react-animate-on-scroll"
import ReactFullpage from '@fullpage/react-fullpage';

@connect((store) => {
	return{
		lang: store.langManagement.lang,
	}
})
class HomepageHeading extends Component {
	constructor(props){
		super(props)
		this.mobile = props.mobile
	}

	render(){
		let text = lang[this.props.lang].homePage
		return(
			<Container text>
			

			<Header as='h1' content='Icarus' inverted
				style={{
					fontSize: this.mobile ? '2em' : '4em',
					fontWeight: 'normal',
					marginBottom: 0,
					marginTop: this.mobile ? '1.5em' : '3em',
					zIndex: 100,
				}}
			/>

			<Header as='h2' content={text.heroText} inverted
				style={{
					fontSize: this.mobile ? '1.5em' : '1.7em',
					fontWeight: 'normal',
					marginTop: this.mobile ? '0.5em' : '1.5em',
				}}
			/>

			<Button as={ Link } to="login" primary size='huge'>
				{text.b_hero}
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
		lang: store.langManagement.lang,
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

		let text = lang[this.props.lang].homePage
		
		const { children } = this.props
		const { fixed } = this.state

		return (
		<Responsive {...Responsive.onlyDesktop} minWidth={768}>

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

							<Menu.Item as='a'>{text.nav.Home}</Menu.Item>
							<Menu.Item as='a' href="#demo_header">{text.nav.Demo}</Menu.Item>
							<Menu.Item position='right'>

								<Button as={Link}
										to="/login"
										name="login"										
										inverted={!fixed}
										>{text.nav.b_LogIn}</Button>

								<Button as={Link}
										to="/register"
										name="register"										
										inverted={!fixed} 
										primary={fixed} 									
										style={{ marginLeft: '0.5em' }}
										>{text.nav.b_SignUp}</Button>

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

@connect((store) => {
	return{
		lang: store.langManagement.lang,
	}
})
class MobileContainer extends Component {
	state = {}
	
	render() {
		let text = lang[this.props.lang].homePage		

		const { children } = this.props
		return (
		<Responsive {...Responsive.onlyMobile} minWidth={0}>
			<Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>

				<Container>
					<Menu inverted pointing secondary size='large'>
						<Menu.Item position='right'>
							<Button as={Link} to="/login" inverted>{text.nav.b_LogIn}</Button>
							<Button as={Link} to="/register" inverted style={{ marginLeft: '0.5em' }}>{text.nav.b_SignUp}</Button>
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
		lang: store.langManagement.lang,
	}
})
class HomepageLayout extends Component {
	render() {
		let text = lang[this.props.lang].homePage

		return(
			<ResponsiveContainer>
				
				<Segment style={{ padding: '8em 0em' /* , height: "100vh"*/ }}>
					<Header as='h2' id="demo_header" style={{ fontSize: '3em', align: 'center', alignText: 'center' }}>Is this your 3D workflow?</Header>

					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>
						</Grid.Row>
						<Grid.Row columns="equal">
							<Grid.Column width={5} stretched={true}>
								<ScrollAnimation animateIn="fadeIn" duration={0.4} delay={0} animateOnce={true}>
								<p style={{ fontSize: '1.33em' ,height: "300px", backgroundColor: "rgb(233,233,233)", padding: "2em" }}>creating the needed 3D assets or buying expensive ones from stores (illustration)</p>
								</ScrollAnimation>
							</Grid.Column>
							<Grid.Column width={5} stretched={true}>
								<ScrollAnimation animateIn="fadeIn" duration={0.4} delay={200} animateOnce={true}>
								<p style={{ fontSize: '1.33em' ,height: "300px", backgroundColor: "rgb(233,233,233)", padding: "2em"}}>The cup with the filenames or similar</p>
								</ScrollAnimation>
							</Grid.Column>
							<Grid.Column width={6} stretched={true}>
								<ScrollAnimation animateIn="fadeIn" duration={0.4} delay={400} animateOnce={true}>
								<p style={{ fontSize: '1.33em' ,height: "300px", backgroundColor: "rgb(233,233,233)", padding: "2em"}}>Email to a colleague “Hey can you have a look and tell me what to change?”
								Received email from colleague in 20 hours: “Yeah, I think that you should change the mirror up a bit”
								Sent response: “Wait, which one and what exactly do you want?”</p>
								</ScrollAnimation>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>

				<Segment style={{ padding: '8em 0em' }} vertical>
				<Header as='h2' id="demo_header" style={{ fontSize: '3em', align: 'center', alignText: 'center' }}>Say hello to Icarus</Header>

					<Grid container stackable verticalAlign='middle'>
						<Grid.Row className="spaced">

							<Grid.Column width={8}>
								<Header as='h3' style={{ fontSize: '2em' }}>{text.s_keepTrack.title}</Header>
								<p style={{ fontSize: '1.33em' }}>
									{text.s_keepTrack.content}				
								</p>
							</Grid.Column>

							<Grid.Column floated='right' width={6}>
								<ScrollAnimation animateIn='slideInRight' animateOnce={true} duration={1.5}>
								<ScrollAnimation animateIn='fadeIn' animateOnce={true}  duration={1.5}>
								<Image rounded
								size='large'
								src='/img/trex.png'
								/>
								</ScrollAnimation>
								</ScrollAnimation>
							</Grid.Column>

						</Grid.Row>

						<Grid.Row className="spaced">
							<Grid.Column floated='right' width={6}>
								<ScrollAnimation animateIn='slideInLeft' animateOnce={true} duration={1.5}>
								<ScrollAnimation animateIn='fadeIn' animateOnce={true}  duration={1.5}>
								<Image rounded
								size='large'
								src='/img/trex.png'
								/>
								</ScrollAnimation>
								</ScrollAnimation>
							</Grid.Column>

							<Grid.Column width={8}>
								<Header as='h3' style={{ fontSize: '2em' }}>{text.s_accessible.title}</Header>
								<p style={{ fontSize: '1.33em' }}>
									{text.s_accessible.content}
								</p>
							</Grid.Column>			

						</Grid.Row >

						<Grid.Row className="spaced">
							

							<Grid.Column width={8}>
								<Header as='h3' style={{ fontSize: '2em' }}>Automatic model generation</Header>
								<p style={{ fontSize: '1.33em' }}>
									State-of-the-art AI performance. Rapid prototyping accessible to everyone.
								</p>
							</Grid.Column>		

							<Grid.Column floated='right' width={6}>
								<ScrollAnimation animateIn='slideInRight' animateOnce={true}  duration={1.5}>
								<ScrollAnimation animateIn='fadeIn' animateOnce={true}  duration={1.5}>

									<Image rounded
									size='large'
									src='/img/trex.png'
									/>
									</ScrollAnimation>
								</ScrollAnimation>

							</Grid.Column>	

						</Grid.Row>
					</Grid>
				

					

				</Segment>

				<ScrollAnimation animateIn='fadeIn' animateOnce={true}>

				<Segment style={{ padding: '0em' }} vertical>
					<Grid celled='internally' columns='equal' stackable>
						<Grid.Row textAlign='center'>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								<Header as='h3' style={{ fontSize: '2em' }}>{text.s_objRating.first}</Header>
								<p style={{ fontSize: '1.33em' }}>{text.s_objRating.second}</p>
							</Grid.Column>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>

								<Header as='h3' style={{ fontSize: '2em' }}>{text.s_clientRating.first}</Header>
								
								<p style={{ fontSize: '1.33em' }}>
									<b>{text.s_clientRating.second}</b>
								</p>

							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>
				</ScrollAnimation>
				

				<Header as='h3' id="demo_header" style={{ fontSize: '3em', align: 'center', alignText: 'center' }}>{text.demoText}</Header>
				
				<Segment style={{ height: "600px"}} vertical id="demo">
					<Visibility style={{ height: '100%' }} onOnScreen={console.log("Render Canvas")}>
						<Canvas3D modelPath="/models/aventador/Avent.obj" texturePath="/models/aventador/Avent.mtl" demo={true}/>
					</Visibility>
				</Segment>
				
				<Grid centered style={{padding: '2em'}}>
				<Segment style={{ padding: '8em' }} vertical>
					<Header as='h4' style={{ fontSize: '2em', align: 'center', alignText: 'center' }}>Try out the platform!</Header>
					
					
					<Button id="get_started" as={ Link } to="register" primary size='medium'>
						{text.b_hero}
						<Icon name='right arrow' />
					</Button>

					<Header as='h4' style={{ fontSize: '2em', align: 'center', alignText: 'center' }}>Hyped yet? Give us your feedback for a free 3 month trial!</Header>
					
					<Button id="get_started" as={ "a" } href="https://docs.google.com/forms/d/1Jqd06-j9LD5VY5TC904S8L3s6Rgi3bIULjU-L9EZxGk/edit?ts=5b8d1843" primary size='medium'>
						Form
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
										<Header inverted as='h4' content={text.footer.about} />
										<List link inverted>
											<List.Item as='a'>{text.footer.sitemap}</List.Item>
											<List.Item as='a'>{text.footer.contact}</List.Item>
										</List>
									</Grid.Column>

									<Grid.Column width={7}>
										<Header as='h4' inverted>Icarus</Header>
										<p>{text.heroText}</p>
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