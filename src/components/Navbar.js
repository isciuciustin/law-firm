import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Carousel, CarouselItem, Row, Col, Card } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';
import { Link, Outlet, NavLink , Route , Navigate, useNavigate} from 'react-router-dom';

function MainNavbar () {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [user, setuser] = useState("");
    const [premium, setpremium] = useState(0);
    onAuthStateChanged((auth), (currentuser) => {
      if (currentuser != null){
        setuser(currentuser.displayName)
        if(window.location.href.split("/")[3] != "user")
         window.location.href =  `/user/${currentuser.displayName}`;
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
    const LogIn = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setuser(result.user.reloadUserInfo.displayName)
      console.log('tata')
    }
    const LogOut = async () => {
      const response = await signOut(auth);
      setuser("");
      window.location.href = "/"
    }
    return (
        <>
        <Navbar bg="light" >
          <Container>
            <Navbar.Brand > Law firm</Navbar.Brand>
            {
              premium > 0 ?
                <>
                  <Navbar.Brand><Link style={{textDecoration : "none", color : "black"}} to={`/user/${user}/premium`}>Premium-content</Link> </Navbar.Brand>
                </>
                :
                <></>
            }

            <Navbar.Brand>
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