import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GlobalContext from "../../context/Context";
import { auth, db } from "../../firebase";
import ContactsFloatingIcon from "../../components/ContactsFloatingIcon";
import ListItem from "../../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import useContacts from "../../hooks/useHooks";

// import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "njangiGroups"),
    where("members", "array-contains", currentUser.uid)
  );

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // userB: doc
        //   .data()
        //   .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  function onLogout(){
    signOut(auth)
  }

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.uid}
          room={room}
          time={room.lastMessage.createdAt}
          user={room}
        />
        // <ListItem
        //   type="chat"
        //   description={room.lastMessage.text}
        //   key={room.id}
        //   room={room}
        //   time={room.lastMessage.createdAt}
        //   user={getUserB(room.userB, contacts)}
        // />
      ))}
      <TouchableOpacity onPress={onLogout}>
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
      <ContactsFloatingIcon />
    </View>
  );
}
