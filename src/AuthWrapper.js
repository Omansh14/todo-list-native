import auth from '@react-native-firebase/auth';
import React, {createContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const AuthContext = createContext({
  isVerified: false,
});

const AuthWrapper = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    function onAuthStateChanged(user) {
      setUser(user);
      setInitializing(false);
      if (user) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return initializing ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <AuthContext.Provider value={{isVerified}}>{children}</AuthContext.Provider>
  );
};

export default AuthWrapper;
