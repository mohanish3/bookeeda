import React from 'react';
import {StyleSheet} from 'react-native';
import {RootNavigator} from './src/navigation/RootNavigator';
import * as secrets from './secretKey';

import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {firebase} from '@react-native-firebase/auth';
import Spinner from 'react-native-spinkit';
import {primaryColor} from './src/utilities/Colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {storeUserInfo} from './src/actions/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      gettingLoginStatus: true,
      firebaseInfo: {},
    };
  }

  //Initializes google and firebase login
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: secrets.webKey,
      androidClientId: secrets.androidKey,
    });
    if (!firebase.apps.length) {
      firebase.initializeApp({
        appId: secrets.appId,
        apiKey: secrets.apiKey,
        databaseURL: secrets.databaseUrl,
        messagingSenderId: secrets.androidKey,
        projectId: secrets.projectId,
        storageBucket: secrets.storageBucket,
      });
    }
    this._isSignedIn();
  }

  //Checks for prior sign in
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //Get the User details as user is already signed in
      await this._getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    this.setState({gettingLoginStatus: false});
  };

  //Sign in silently if already logged in on device
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      var firebaseInfo = await firebase.auth().signInWithCredential(credential);
      this.props.actions.storeUserInfo(userInfo);
      this.setState({userInfo: userInfo, firebaseInfo: firebaseInfo});
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  //Google sign in and firebase auth login
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      var firebaseInfo = await firebase.auth().signInWithCredential(credential);
      this.setState({userInfo: userInfo, firebaseInfo: firebaseInfo});
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userInfo: null}); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return this.state.gettingLoginStatus ? (
      <Spinner
        type={'Wave'}
        size={100}
        color={primaryColor}
        style={styles.spinner}
      />
    ) : (
      <RootNavigator
        start={
          Object.keys(this.state.userInfo).length === 0
            ? 'LoginPage'
            : 'HomeNavigator'
        }
        firebaseInfo={this.state.firebaseInfo}
      />
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const ActionCreators = Object.assign({}, {storeUserInfo});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
