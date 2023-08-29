import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { doc, updateDoc, query, collection, where, getDoc } from "firebase/firestore";
import { removeHttp } from '../../utils';
import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const JoinGroupScreen = () => {
    const [joinLink, setJoinLink] = useState('http://fundsavy.app/31ee71f7-5412-4d1e-8012-4b5c8c7562d3');
    const [room, setRoom] = useState();
    const groupsRef = doc(db, "njangiGroups", removeHttp(joinLink));
    const navigation = useNavigation()
    const groupQuery = query(
        collection(db, "njangiGroups"),
        where("joinLink", "==", joinLink)
    );
  
    const handleJoinLinkChange = (text) => {
      setJoinLink(text);
    };
  
    const handleJoinGroup = async () => {
        const docSnap = await getDoc(groupsRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setRoom(docSnap.data())
        } else {
            console.log("No such document!");
        }

        await updateDoc(groupsRef, {
          members: [...room.members, auth.currentUser.uid]
        });

        navigation.navigate("chats")

        console.log('Joining group with link:', joinLink);
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter join link"
          value={joinLink}
          onChangeText={handleJoinLinkChange}
        />
        <Button title="Join Group" onPress={handleJoinGroup} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
  });
  
  export default JoinGroupScreen;
  