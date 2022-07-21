import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../firebase-config';
import { useParams, Link } from 'react-router-dom';
import MainNavbar from './Navbar';


function Premium() {
    const [user, setuser] = useState("");
    const [articles, setarticles] = useState([]);
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged((auth), (currentuser) => {
        if (currentuser != null) {
            setuser(currentuser.displayName);

        }
        if (user != "") {

        }
    })
    useEffect(() => {
        getDocs(collection(db, "premium")).then((data) => {
            data.forEach((doc) => {
                let article = {
                    id: doc.id,
                    title: doc.data().title,
                    art: doc.data().article
                }
                setarticles(art => [...art, article])
            })
        })
    }, [])
    return (
        <>
            <Container fluid>
                <MainNavbar />
                <Container style={{ marginTop: "50px" }}>
                    <ul>
                        {
                            articles.map((data, index) => {
                                return <li style={{ marginTop: "15px" }} key={data.id}>
                                    <Link style={{ textDecoration: "none", color: "black" }} to={`/user/:email/premium/${data.id}`}>
                                        <h5>{data.title}</h5>
                                       
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </Container>
            </Container>
        </>
    )
}
export default Premium;