import React, { useState, useEffect, useContext } from "react";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignIn from "./screens/Auth/SignIn";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import Profile from "./screens/Chat/Profile";
import Chats from "./screens/Chat/Chats";
import Photo from "./screens/Photo";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "./screens/Chat/Contacts";
import Chat from './screens/Chat/Chat'
import PhoneScreen from "./screens/Auth/PhoneScreen";
import ChatHeader from './components/ChatHeader'

import COLORS from "./constants"
import Schedule from "./screens/Schedule";
import EmailPassword from "./screens/Auth/EmailPassword";
import VerifyPhone from "./screens/Auth/VerifyPhone";
import NPhone from "./screens/Auth/NPhone";
import CreateGroup from "./screens/Groups/CreateGroup";
import HomeA from "./screens/HomeA";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [uemail, setUemail] = useState();
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
        setUemail(user.email)
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!uemail ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="phoneNumber" component={NPhone} />
          <Stack.Screen name="verifyPhone" component={VerifyPhone} />
          <Stack.Screen name="emailPassword" component={EmailPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ title: "FundSavy" }}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Select Contacts" }}
            component={Contacts}
          />
          <Stack.Screen
            name="createGroup"
            options={{ title: "New Group" }}
            component={CreateGroup}
          />
          <Stack.Screen name="chat" component={Chat} options={{headerTitle: (props) => <ChatHeader {...props} />}}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: COLORS.primary,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="home" component={HomeA} />
      <Tab.Screen name="chats" component={Chats} />
      <Tab.Screen name="accounts" component={Chats} />
    </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;
