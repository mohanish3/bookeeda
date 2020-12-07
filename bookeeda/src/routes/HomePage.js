import {View, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {get} from '../utilities/ApiFunctions';
import {GoogleSignin} from 'react-native-google-signin';
import Categories from './Categories';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fab, Toast, Root} from 'native-base';
import Spinner from 'react-native-spinkit';
import {primaryColor} from '../utilities/Colors';
import BookSwiper from '../components/BookSwiper';
import {firebaseGet, firebaseSet} from '../utilities/firebaseOps';

export class HomePage extends React.Component {
  state: {
    showCategories: boolean,
    categoryData: any,
    loadingCategory: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCategories: true,
      categoryData: [],
      loadingCategory: false,
    };
    this._getCategoryData = this._getCategoryData.bind(this);
    this._emptyListCallback = this._emptyListCallback.bind(this);
  }

  _emptyListCallback() {
    this.setState({
      showCategories: true,
    });
    this.state.categoryData = [];
    Toast.show({
      text: 'Reading more. Swipe less.',
      buttonText: 'Okay',
      duration: 5000,
    });
  }

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.navigation.replace('LoginPage');
    } catch (error) {
      console.error(error);
    }
  };

  async _getCategoryData(data: string) {
    this.setState({loadingCategory: true});
    data = data.toLocaleLowerCase();
    data = data.split(' ').join('+');
    var ind = await firebaseGet([
      'users',
      this.props.firebaseInfo.user.uid,
      'index',
      data,
    ]);
    var curr = await get(
      [],
      [
        'q=subject:' + data,
        'maxResults=20',
        'startIndex=' + ((ind == null ? 0 : ind) * 20 + 1).toString(),
      ],
    );
    firebaseSet(
      ['users', this.props.firebaseInfo.user.uid, 'index', data],
      ind + 1,
    );
    this.state.categoryData.push(...curr);
    this.setState({
      showCategories: false,
      categoryData: this.state.categoryData,
      loadingCategory: false,
    });
  }

  render() {
    return (
      <Root>
        <View style={styles.page}>
          <StatusBar translucent backgroundColor={'transparent'} />
          {this.state.loadingCategory ? (
            <Spinner
              type={'Wave'}
              size={100}
              color={primaryColor}
              style={styles.spinner}
            />
          ) : this.state.showCategories ? (
            <Categories getCategoryData={this._getCategoryData} />
          ) : (
            <BookSwiper
              data={this.state.categoryData}
              emptyListCallback={this._emptyListCallback}
              style={styles.swiper}
              firebaseInfo={this.props.firebaseInfo}
            />
          )}
          <Fab onPress={this._signOut} style={styles.button}>
            <Icon name={'logout'} size={50} />
          </Fab>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    elevation: 5,
    borderRadius: 30,
    fontSize: 20,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    justifyContent: 'flex-start',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
