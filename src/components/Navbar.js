import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';
import { Link, Outlet, NavLink , Route , Navigate, useNavigate} from 'react-router-dom';

function MainNavbar () {
    const  navigate = useNavigate();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [user, setuser] = useState("");
    const [premium, setpremium] = useState(0);
    onAuthStateChanged((auth), (currentuser) => {
      if (currentuser != null){
        setuser(currentuser.displayName)
        window.location.href =  `/user/:${currentuser.email}`;
      }
      // if (user != "") {
      //   getDoc(doc(db, "law-firm", user)).then((data) => {
      //     if (data.data() != null) {
      //       setpremium(Math.ceil((data.data().type.split("-")[1] - Date.now()) / 86400000))
      //     }
      //     else {

      //       setDoc(doc(db, 'law-firm', user), { type: "user" }).then(() => {
      //         console.log('Normal user')
      //       })
      //     } 
      //   })
      //   navigate(`/user/:${currentuser.email}`);
      // }
    })
    const LogIn = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setuser(result.user.reloadUserInfo.displayName)
      console.log('tata')
    }
    const LogOut = async () => {
      const response = await signOut(auth);
      setuser("");
    }
    // const setPremium = async () => {
    //     const date = Date.now() + 2592000000;
    //     await setDoc(doc(db, 'law-firm', user), { type: "premium-" + date })
    //     setpremium(date);
    //   }
    return (
        <>
        <Navbar bg="light" >
          <Container>
            <Navbar.Brand href="home">Law firm</Navbar.Brand>
            {/* {
              premium > 0 ?
                <>
                  <Navbar.Brand href="home">Premium-content</Navbar.Brand>
                  <Navbar.Brand> <NavLink to = "/discuss" style = {{textDecoration : "none", color : "black"}}>Discuss</ NavLink></Navbar.Brand>
                </>
                :
                <></>
            } */}

            <Navbar.Brand href="#home">
              {
                user === "" ?
                  <Button variant="outline-dark" onClick={LogIn}>Login</Button> :
                  <>
                    {user}   <Button variant="outline-dark" onClick={LogOut}>Logout</Button>
                  </>
              }
            </Navbar.Brand>
          </Container>
        </Navbar>
        </>
    )
}

export default MainNavbar;