import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { nanoid }from 'nanoid'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from "./firebase"
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";


export async function pickImage() {
  let result = ImagePicker.launchCameraAsync();
  return result;
}
export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

export async function uploadImage(uri, path, fName) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = fName || nanoid();
    const imageRef = ref(storage, `${path}/${fileName}.jpeg`);
  
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });
  
    blob.close();
  
    const url = await getDownloadURL(snapshot.ref);
  
    return { url, fileName };
  }
  


const palette = {
  tealGreen: "#128c7e",
  tealGreenDark: "#075e54",
  green: "#25d366",
  lime: "#dcf8c6",
  skyblue: "#34b7f1",
  smokeWhite: "#ece5dd",
  white: "white",
  gray: "#3C3C3C",
  lightGray: "#757575",
  iconGray: "#717171",
};

export const theme = {
  colors: {
    background: palette.smokeWhite,
    foreground: palette.tealGreenDark,
    primary: palette.tealGreen,
    tertiary: palette.lime,
    secondary: palette.green,
    white: palette.white,
    text: palette.gray,
    secondaryText: palette.lightGray,
    iconGray: palette.iconGray,
  },
};

export const NotificationsList = [
  {
    id: 1,
    Title: "Notifications",
    icon: <Ionicons name="notifications-outline" size={24} color="white" />
  },
  {
    id: 2,
    Title: "Calls",
    icon: <Ionicons name="call-outline" size={24} color="white" />
  },
];

export const NjangiGroupsList = [
  {
    id: 1,
    Title: "All Groups",
    icon: <MaterialIcons name="groups" size={24} color="white" />,
    scrn: "chats"
  },
  {
    id: 2,
    Title: "Create Group",
    icon: <AntDesign name="addusergroup" size={24} color="white" />,
    scrn: "createGroup"
  },
  {
    id: 3,
    Title: "Join Njangi Group",
    icon: <Ionicons name="enter-outline" size={24} color="white" />
  },
  {
    id: 4,
    Title: "Njangi Group Invites",
    icon: <Ionicons name="md-mail-unread-outline" size={24} color="white" />
  },
];

export const FundGroupsList = [
  {
    id: 1,
    Title: "Create Fund Group",
    icon:<AntDesign name="addusergroup" size={24} color="white" />
  },
  {
    id: 2,
    Title: "Join Fund Group",
    icon: <Ionicons name="enter-outline" size={24} color="white" />
  },
  {
    id: 3,
    Title: "Fund Group Invites",
    icon: <Ionicons name="md-mail-unread-outline" size={24} color="white" />
  },
];
export const TransactionsList = [
  {
    id: 1,
    Title: "Transfer Money",
    icon: <MaterialCommunityIcons name="bank-transfer" size={24} color="white" />
  },
  {
    id: 2,
    Title: "Schedule Transfer",
    icon: <MaterialIcons name="schedule-send" size={24} color="white" />
  },
  {
    id: 3,
    Title: "Buy Airtime",
    icon: <MaterialIcons name="sim-card" size={24} color="white" />
  },
  {
    id: 4,
    Title: "All Schedules",
    icon: <MaterialIcons name="schedule" size={24} color="white" />
  },
  {
    id: 5,
    Title: "Transfer History",
    icon: <MaterialIcons name="history" size={24} color="white" />
  },
];