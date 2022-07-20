import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';
import MainNavbar from './Navbar';


function Premium(){
    return (
        <>
            <Container fluid>
                <MainNavbar />
            </Container>
        </>
    )
}
export default Premium;