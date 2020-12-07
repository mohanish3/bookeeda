import {firebase} from '@react-native-firebase/database';

const database = firebase.database();

export async function firebaseGet(pathList) {
  var node = database.ref(pathList[0]);
  for (var i = 1; i < pathList.length; i++) {
    node = node.child(pathList[i]);
  }
  var snapshot = await node.once('value');
  return snapshot.val();
}

export function firebaseSet(pathList, element) {
  var node = database.ref(pathList[0]);
  for (var i = 1; i < pathList.length; i++) {
    node = node.child(pathList[i]);
  }
  node.set(element);
}
