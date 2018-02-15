import React, {Component} from 'react';
import { Carousel } from 'react-bootstrap';

import image1 from '../../img/1.jpg'
import image2 from '../../img/2.jpg'


export default class HomePage extends Component {
    render () {
        return (
            <div className="content">
            
                <Carousel className="hero">

                    <Carousel.Item>
                        <img width={1920} height={600} alt="1920x500" src={image1} />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img width={1920} height={600} alt="1920x500" src={image2} />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img width={1920} height={600} alt="1920x500" src={image2} />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                </Carousel>

                <section className="section firstSection">
                    <div class="sectionTitle">Hello</div>
                </section>

                <section className="section secondSection">
                    <div class="sectionTitle">Hello</div>
                </section>

                <section className="section thirdSection">
                    <div class="sectionTitle">Hello</div>
                </section>
            </div>
        );
    }
}