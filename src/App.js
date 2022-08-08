import React, { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import firebaseConfig from './firebase-config';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

const configApp = initializeApp(firebaseConfig);

function App() {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignedIn: false,
    Photo: '',
    Name: '',
    Email: '',

  })


  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        const { displayName, photoURL, email } = result.user;

        const Userdetail = {
          isSignedIn: true,
          Photo: photoURL,
          Email: email,
          Name: displayName,
        }
        setUser(Userdetail);

      })

  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(res => {

      const Userdetail = {
        isSignedIn: false,
        Photo: '',
        Email: '',
        Name: '',
      }
      setUser(Userdetail);


    }).catch((error) => {

    });
  }

  const handleSubmit = () => {
  }

  const handleChange = (e) => {

    let isFormValid =true ;
    // console.log(e.target.value,e.target.name);

    if(e.target.name==='email') {
      var validEmail = /\S+@\S+\.\S+/.test(e.target.value);
      isFormValid=validEmail 

    }
    if(e.target.name  ==='password') {
      var validPassword = e.target.value.length >8
      isFormValid=validPassword

    }
    if(isFormValid){
      const newUserInfo ={...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    

    
  }

  console.log(user)

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <br />
          <br />
          <img src={user.Photo} alt="noimage" />
          <p>{user.Name}</p>
          <p>{user.Email}</p>

          
        </div>
      }
      <h1>personal authentication</h1>
      <h4>Name:{user.name}</h4>
      <h4>Email:{user.email}</h4>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" onBlur={handleChange} placeholder="your name" /> <br /><br />
            <input type="text"name='email' placeholder='something@email.com' onBlur={handleChange} />
            <br /> <br />
            <input type="password" name="password" placeholder='password' onBlur={handleChange} required/>
            <br />
            <input type="submit" value="submit" />
          </form>

    </div>
  );
}

export default App;
