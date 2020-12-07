//Fiction
//Novel
//Drama
//Philosophy
//Mathematics
//Biology
//Programming

import React from 'react';
import {Text, List, ListItem} from 'native-base';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

export default class Categories extends React.Component {
  categories = [
    'Fiction',
    'Novel',
    'Drama',
    'Philosophy',
    'Mathematics',
    'Biology',
    'Programming',
    'Computer Science',
  ];

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Select category</Text>
        <SafeAreaView>
          <List
            dataArray={this.categories}
            renderRow={(val) => (
              <ListItem
                onPress={() => {
                  this.props.getCategoryData(val);
                }}
                style={styles.listitem}
              >
                <Text style={styles.text}>{val}</Text>
              </ListItem>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 18 : StatusBar.currentHeight,
  },
  list: {
    width: Dimensions.get('window').width,
  },
  listitem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 25,
  },
  title: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 30,
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
    color: '#202020',
    fontSize: 22,
    fontWeight: '100',
  },
});
