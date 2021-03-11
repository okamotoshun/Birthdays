import React, { useEffect, useState } from 'react';
import styles from '../style/Auth.module.scss';
import { auth, provider } from '../firebase';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
} from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import SendIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// ---------------------------------- modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// ---------------------------------- modal

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1608231289569-70b69ce47b0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: 'none',
    position: 'absolute',
    width: 400,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const gestemail = 'gest@gmail.com';
  const gestpassword = 'gestgest';
  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      (await user) && props.history.push('/birthdaylist');
    });
    return () => unSub();
  }, [props.history]);

  const sendResetEmail = async () => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail('');
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail('');
      });
  };

  const signInGest = async () => {
    await auth.signInWithEmailAndPassword(gestemail, gestpassword);
    props.history.push('/birthdaylist');
  };

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
    props.history.push('/birthdaylist');
  };

  const signUpEmail = async () => {
    await auth.createUserWithEmailAndPassword(email, password);
    props.history.push('/birthdaylist');
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.messa));
    props.history.push('/birthdaylist');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !email || password.length < 6
              }
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInEmail();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
                  : async () => {
                      try {
                        await signUpEmail();
                      } catch (err) {
                        alert(err.message);
                      }
                    }
              }>
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Grid container>
              <Grid item xs>
                <span
                  onClick={() => setOpenModal(true)}
                  className={styles.login_reset}>
                  Forgot password ?
                </span>
              </Grid>
              <Grid item>
                <span
                  className={styles.login_toggleMode}
                  onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Create new account ?' : 'Back to login'}
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="default"
              style={{ backgroundColor: '#22BA45', color: 'white' }}
              className={classes.submit}
              startIcon={<HowToRegIcon />}
              onClick={signInGest}>
              Gest Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              // className={classes.submit}
              startIcon={<CameraIcon />}
              onClick={signInGoogle}>
              SignIn with Google
            </Button>
          </form>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div style={getModalStyle()} className={classes.modal}>
              <div className={styles.login_modal}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="email"
                  name="email"
                  label="Reset E-mail"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                  }}
                />
                <IconButton onClick={sendResetEmail}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;
