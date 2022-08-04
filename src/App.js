import React, { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import firebaseConfig from './firebase-config';

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

    </div>
  );
}

export default App;
