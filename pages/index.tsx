import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, verifyBeforeUpdateEmail, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase_config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCreateUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const handleLoginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      alert('User logged in');
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };
  const handleChangeEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email != null) {
        const { user: reauthenticatedUser } = await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, password),
        );
        await verifyBeforeUpdateEmail(reauthenticatedUser, newEmail);
        alert('Verification email sent');
      } else {
        alert('No user is logged in');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
  return (
    <div>
      <h1>MCVE for Email Change Issue</h1>
      {!loggedIn ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleLoginUser}>Login</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Change Email</h2>
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleChangeEmail}>Change Email</button>
        </div>
      )}
    </div>
  );
}
export default Home;