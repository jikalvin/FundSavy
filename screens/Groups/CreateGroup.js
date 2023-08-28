import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import GlobalContext from "../../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../../utils";
import { auth, db } from "../../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { uuidv4 } from "@firebase/util";


export default function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    setLoading(true)
    const user = auth.currentUser;
    const id = uuidv4();
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `groups/${id}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const groupData = {
      name,
      description
    };
    if (photoURL) {
      groupData.photoURL = photoURL;
    }

    await setDoc(doc(db, "njangiGroups", id), { ...groupData, uid: id })
    setLoading(false)
    navigation.navigate("home");
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
        //   justifyContent: "center",
          flex: 1,
          paddingTop: Constants.statusBarHeight + 20,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>
          New Group
        </Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Please provide group name and the other info
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Group Name"
          value={name}
          onChangeText={setName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <TextInput
          placeholder="Group Description"
          value={description}
          onChangeText={setDescription}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <View style={{ marginTop: 20, width: 80 }}>
          <Button
            title={loading ? "Creating" : "Create"}
            color={colors.secondary}
            onPress={handlePress}
            disabled={!name || !description}
          />
        </View>
      </View>
    </React.Fragment>
  );
}
