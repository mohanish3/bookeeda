import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {firebase} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/EvilIcons';
import {primaryColor} from '../utilities/Colors';

export class LoginPage extends React.Component {
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
      var firebaseret = await firebase.auth().signInWithCredential(credential);
      console.log(firebaseret);
      this.props.navigation.replace('HomeNavigator', firebaseret);
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => this._signIn()}
        >
          <Icon name="sc-google-plus" size={50} color={primaryColor} />
          <Text style={styles.text}>Sign In With Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  signInButton: {
    elevation: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * (3 / 4),
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderColor: primaryColor,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  text: {
    fontWeight: '700',
    marginLeft: 5,
    fontSize: 22,
    color: primaryColor,
  },
});
