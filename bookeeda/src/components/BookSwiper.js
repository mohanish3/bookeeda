import React from 'react';
import {DeckSwiper, Text, View, Card} from 'native-base';
import {StyleSheet, Dimensions, Image, Platform, StatusBar} from 'react-native';
import {firebaseSet, firebaseGet} from '../utilities/firebaseOps';

export default class BookSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  async swipeRight(item) {
    var list = await firebaseGet([
      'users',
      this.props.firebaseInfo.user.uid,
      'right',
    ]);
    if (list == null) {
      list = [item.id];
    } else {
      list.push(item.id);
    }

    firebaseSet(['users', this.props.firebaseInfo.user.uid, 'right'], list);
  }

  swipeLeft(item) {
    //firebaseSet(['users', this.props.firebaseInfo.user.uid, 'right'],[item.id],);
  }

  render() {
    return (
      <View style={styles.view}>
        <DeckSwiper
          dataSource={this.props.data}
          looping={false}
          style={styles.text}
          renderItem={(item) => (
            <Card style={styles.card}>
              <Image
                source={{
                  uri:
                    item.volumeInfo.imageLinks == null
                      ? 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                      : item.volumeInfo.imageLinks.thumbnail,
                }}
                style={styles.image}
              />
              <View>
                <Text style={styles.text} numberOfLines={3}>
                  {item.volumeInfo.title}
                </Text>
                <Text style={styles.authors} numberOfLines={2}>
                  {item.volumeInfo.authors}
                </Text>
                <Text style={styles.description} numberOfLines={5}>
                  {item.volumeInfo.description}
                </Text>
              </View>
            </Card>
          )}
          onSwipeRight={(item) => {
            this.swipeRight(item);
          }}
          onSwipeLeft={(item) => {
            this.swipeLeft(item);
          }}
          renderEmpty={this.props.emptyListCallback}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? 18 : StatusBar.currentHeight,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 25,
    height: Dimensions.get('window').height,
  },
  image: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * (3 / 4),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  text: {
    paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  authors: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexWrap: 'nowrap',
  },
});
