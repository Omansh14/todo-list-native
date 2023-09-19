import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    container,
    title,
    subtitle,
    loginBlock,
    userNameText,
    usernameInput,
    passwordText,
    buttonStyle,
    buttonText,
    errorStyle,
    loaderStyle,
    bottomTextStyle,
    loginTextStyle,
  } = styles;

  const onChangeText = (type, text) => {
    setError('');
    if (type === 'email') {
      setEmailError('');
      setEmail(text.trim());
    } else {
      setPasswordError('');
      setPassword(text);
    }
  };

  const validateEmail = () => {
    const splitEmail = email.split('@');
    if (!splitEmail[0] || !splitEmail[1]) {
      return false;
    } else {
      const domain = splitEmail[1].split('.');
      if (!domain[0] || !domain[1]) {
        return false;
      }
      return true;
    }
  };

  const userSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('todos');
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          setEmailError('Please use valid email address');
        } else if (err.code === 'auth/email-already-in-use') {
          setError(
            'Email already in use, Please Login or use different email address',
          );
        } else if (err.code === 'auth/weak-password') {
          setPasswordError('Please create a strong password');
        }
      });
  };

  const userLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('todos'))
      .catch(() => {
        setError('*Please Enter Correct details or Signup');
      });
  };

  const onPressLoginOrSignup = () => {
    if (email === '' || !validateEmail()) {
      setEmailError('Please enter a valid email');
    } else if (password === '') {
      setPasswordError('Please enter a valid password');
    } else {
      if (isSignup) {
        userSignUp();
      } else {
        userLogin();
      }
    }
  };

  const onPressText = () => {
    setLoading(true);
    setTimeout(() => {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setError('');
      setIsSignup(!isSignup);
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={container}>
      <Text style={title}>{isSignup ? 'Signup' : 'Login'}</Text>
      <Text style={subtitle}>{`Please ${
        isSignup ? 'sign up' : 'sign in'
      } to continue`}</Text>
      <View style={loginBlock}>
        {error && error?.length > 0 && (
          <Text style={[errorStyle, {marginLeft: 0, marginBottom: 10}]}>
            {error}
          </Text>
        )}
        <Text style={userNameText}>Email</Text>
        <TextInput
          style={usernameInput}
          value={email}
          onChangeText={text => onChangeText('email', text)}
        />
        {emailError && emailError?.length > 0 && (
          <Text style={errorStyle}>{emailError}</Text>
        )}
        <Text style={[userNameText, passwordText]}>Password</Text>
        <TextInput
          style={usernameInput}
          value={password}
          onChangeText={text => onChangeText('password', text)}
          secureTextEntry
        />
      </View>
      {passwordError && passwordError?.length > 0 && (
        <Text style={errorStyle}>{passwordError}</Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={buttonStyle}
        onPress={onPressLoginOrSignup}>
        <Text style={buttonText}>{isSignup ? 'Signup' : 'Login'}</Text>
      </TouchableOpacity>
      <Text style={bottomTextStyle}>
        {`${
          isSignup ? 'Already have an Account?' : "Don't have an Account yet?"
        } `}
        <Text onPress={onPressText} style={loginTextStyle}>
          {isSignup ? 'Login Now' : 'Register Now'}
        </Text>
      </Text>
      {loading && (
        <Modal transparent={true} animationType="fade" visible={loading}>
          <View style={loaderStyle}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  loginBlock: {
    marginTop: 50,
  },
  userNameText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  usernameInput: {
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  passwordText: {
    marginTop: 30,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    height: 50,
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  errorStyle: {
    fontSize: 15,
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
    fontWeight: '500',
  },
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  loginTextStyle: {
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomTextStyle: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
    marginLeft: 10,
  },
});
