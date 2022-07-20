import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';

import MainNavbar from '../components/Navbar';
import { Link, Outlet, NavLink, useNavigate, Route, Navigate, useParams } from 'react-router-dom';

import img1 from '../img/1.jpg';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';


function Main() {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [user, setuser] = useState(useParams().email);
    const [premium, setpremium] = useState(0);
    onAuthStateChanged((auth), (currentuser) => {
        if (currentuser != null) {
            setuser(currentuser.displayName)
            if (window.location.href.split("/")[3] != "user")
                window.location.href = `/user/${currentuser.displayName}`;
        }
        if (user != "") {
            getDoc(doc(db, "law-firm", user)).then((data) => {
                if (data.data() != null) {
                    setpremium(Math.ceil((data.data().type.split("-")[1] - Date.now()) / 86400000))
                }
                else {
                    setDoc(doc(db, 'law-firm', user), { type: "user" }).then(() => {
                        console.log('Normal user')
                    })
                }
            })
        }
    })
    const setPremium = async () => {
        const date = Date.now() + 2592000000;
        await setDoc(doc(db, 'law-firm', user), { type: "premium-" + date })
        setpremium(date);
    }
    return (
        <>
            <Container fluid>
                <MainNavbar />
                <Container>
                    <Carousel>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100"
                                alt="First slide"
                                src={img1}
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100"
                                src={img2}
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100"
                                src={img3}
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <Row>
                        {
                            user === "" ? <></> :
                                <Card style={{ marginTop: "50px", marginBottom: "150px" }}>
                                    <Card.Body>
                                        <Card.Title>Special offer</Card.Title>
                                        <Card.Text>
                                            We offer member-only services for premium users
                                        </Card.Text>
                                        {
                                            premium > 0 ?
                                                <h5>You have remaining {premium} premium days</h5>
                                                :
                                                <Button variant="outline-warning" onClick={setPremium}>PREMIUM</Button>
                                        }
                                    </Card.Body>
                                </Card>
                        }
                    </Row>
                </Container>



            </Container>
        </>
    )
}
export default Main;