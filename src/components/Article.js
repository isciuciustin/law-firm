import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../firebase-config';
import { useParams, Link } from 'react-router-dom';
import MainNavbar from './Navbar';


function Article() {
    const [id, setuser] = useState(window.location.href.split("/")[6]);
    const [article, setarticle] = useState({});
    const db = getFirestore(app);
    useEffect(() => {
        getDoc(doc(db, "premium", id)).then((data) => {
            setarticle(data.data())
        })
    }, [])
    return (
        <>
            <Container fluid>
                <MainNavbar />
                <Container style={{ marginTop: "50px" }}>
                    <Card style = {{marginBottom : "100px"}}>
                        <Card.Header>
                            <h5>{article.title}</h5>
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    <h5 class="lead">
                                        {article.article}
                                    </h5>
                                </p>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    
                </Container>
            </Container>
        </>
    )
}
export default Article;