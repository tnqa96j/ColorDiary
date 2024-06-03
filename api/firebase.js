import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { useSelector } from "react-redux";
import { selectUser } from "../src/redux/pickColorSlice";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APPID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase };

//Diary部分
//C
export const addDiary = async ({user,diaryTitle,diaryContent,diaryColors,diaryTags,timestamp,uri}) => {
  const diaryRef = firebase.firestore().collection('Users').doc(user).collection('Diary');
  const createAt = firebase.firestore.FieldValue.serverTimestamp();
  diaryRef.add({
    title: diaryTitle,
    content: diaryContent,
    palette: diaryColors,
    tags: diaryTags,
    time: timestamp,
    imageUri: uri,
    createAt:createAt,
})

}
//R
export const getDiary = async (user) => {
  const diaryRef = firebase.firestore().collection('Users').doc(user).collection('Diary').orderBy('createAt', 'desc');
  const querySnapshot = await diaryRef.get();
  const diaryData = [];
  querySnapshot.forEach((doc) => {
    const { title, content, imageUri, palette, tags, time } = doc.data();
    diaryData.push({
      id: doc.id,
      title,
      content,
      imageUri,
      palette,
      tags,
      time
    });
  });

  return diaryData;
}

//U
export const editDiary = async ({user,id,title,content,tags}) => {
  const diaryRef = firebase.firestore().collection('Users').doc(user).collection('Diary');
  diaryRef
  .doc(id)
  .update({
    title:title,
    content:content,
    tags:tags,
  })

}
//D
export const deleteDiary = async ({user,data}) => {
  const diaryRef = firebase.firestore().collection('Users').doc(user).collection('Diary');
  diaryRef.doc(data.id).delete();
}

//Tags部分
//C,U
export const addTag = async({tag,type}) =>{
  const tagsRef = firebase.firestore().collection('Tags').doc('g4gerr0ddEoehsdqkkRc');
  if(type === 'Color'){
    tagsRef.update({
      Color:firebase.firestore.FieldValue.arrayUnion(tag)
    })
  }
  else if(type === 'Custom')
  {
    tagsRef.update({
      Custom:firebase.firestore.FieldValue.arrayUnion(tag)
    })
  }
}
//R
export const getColorTags = async() => {
  const tagsRef = firebase.firestore().collection('Tags').doc('g4gerr0ddEoehsdqkkRc');
  const querySnapshot = await tagsRef.get();
  const colortags = querySnapshot.data().Color;

  return colortags;
}

export const getCustomTags = async() => {
  const tagsRef = firebase.firestore().collection('Tags').doc('g4gerr0ddEoehsdqkkRc');
  const querySnapshot = await tagsRef.get();
  const customtags = querySnapshot.data().Custom;

  return customtags;
}

//D
export const deleteColorTag = async({tag}) =>{
  const tagsRef = firebase.firestore().collection('Tags').doc('g4gerr0ddEoehsdqkkRc');
  tagsRef.update({
    Color:firebase.firestore.FieldValue.arrayRemove(tag)
  });
}

export const deleteCustomTag = async({tag}) => {
  const tagsRef = firebase.firestore().collection('Tags').doc('g4gerr0ddEoehsdqkkRc');
  tagsRef.update({
    Custom:firebase.firestore.FieldValue.arrayRemove(tag)
  });
}

//色圖鑑部分
export const getColorAlbum = async () => {
  const albumRef = firebase.firestore().collection('Colors').orderBy('no', 'asc');
  const querySnapshot = await albumRef.get();
  const albumData = [];
  querySnapshot.forEach((doc) => {
    const { id,no,hex,kanji,hiragana,isTextDark,image,descript,isLocked,type } = doc.data();
    albumData.push({
      id: doc.id,
      no,
      hex,
      kanji,
      hiragana,
      isTextDark,
      image,
      descript,
      isLocked,
      type,
    });
  });

  return albumData;
}