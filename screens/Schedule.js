import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import useContacts from "../hooks/useHooks";
import { Stack, Box } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';


export default function Schedule() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
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

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      <Box
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          height: 350,
        }}
      >
        <TouchableOpacity style={[styles.tone, styles.send]}>
          <FontAwesome 
            name="money" 
            size={35} 
            color="#fff" 
          />
          <Text
            style={styles.text}
          >Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ttwo, styles.rates]}>
          <FontAwesome name="money" size={35} color="white" />
          <Text style={styles.text}>Transfer Rates</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tone, styles.schedule]}
        >
          <FontAwesome name="money" size={35} color="#fff" />
          <Text style={styles.text}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ttwo, styles.transfer]}>
          <FontAwesome name="money" size={35} color="white" />
          <Text style={styles.text}>Transfer</Text>
        </TouchableOpacity>
      </Box>

      <ContactsFloatingIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {},
  tone: {
    height: 135,
    width: "40%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    backgroundColor: "#64DFDF",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800"
  },
  schedule: {
    backgroundColor: "#6930C3"
  },
  ttwo: {
    height: 90,
    width: "40%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  rates: {
    backgroundColor: "#252525"
  },
  transfer: {
    backgroundColor: "#80FFDB",
  },
})