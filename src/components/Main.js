import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';

import MainNavbar from './Navbar';

import { Link, Outlet, NavLink , useNavigate, Route, Navigate} from 'react-router-dom';

import img1 from '../img/1.png';
import img2 from '../img/2.jpg';
import img3 from '../img/3.jpg';

function Main() {
    return (
        <>
            <h1>TEST</h1>
        </>
    )
}
export default Main();