import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import useAxiosCommon from '../hooks/useAxiosCommon';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const createUser = async (email, password) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    setLoading(true);
    return await signInWithPopup(auth, googleProvider);
  };

  const githubLogin = async () => {
    setLoading(true);
    return await signInWithPopup(auth, githubProvider);
  };

  const logoutUser = async () => {
    setLoading(true);
    return await signOut(auth);
  };

  const updateUserProfile = async (name, photoUrl) => {
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const { data } = await axiosCommon.post('/jwt', userInfo);
          if (data.token) {
            localStorage.setItem('access-token', data.token);
          }
        } catch (error) {
          console.error('Failed to fetch JWT token:', error);
          localStorage.removeItem('access-token');
        }
      } else {
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    googleLogin,
    githubLogin,
    updateUserProfile,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
