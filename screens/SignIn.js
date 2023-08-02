import React, { useContext, useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";

import { TextInput, Button } from "@react-native-material/core";


import COLORS from "../constants"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
    <ImageBackground source={require("../assets/auth/signin.png")} resizeMode="cover" style={
      {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
        <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }} 
        >
      <Image
        source={require("../assets/auth/logo.png")}
        style={{ width: 180, height: 180, tintColor: COLORS.white }}
        resizeMode="cover"
      />
      <Text
        style={{
          color: COLORS.white,
          fontSize: 12,
          padding: 5
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam tempore ut tempora possimus a, non aut pariatur 
        soluta error laboriosam et ullam est, nisi ducimus nemo doloremque fuga in doloribus nobis.
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: COLORS.white,
          fontWeight: "800",
          marginTop: 10
        }}
      >
        Login
      </Text>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: COLORS.white
          }}
        >
          New Here?
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: COLORS.primary,
          }}
        >
          Create New Account
        </Text>
      </View>
      <View style={{ marginTop: 20, width: "100%", padding: 15}}>
        <TextInput
          placeholder="Email"
          value={email}
          variant="outlined" 
          label="Email"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          value={password}
          variant="outlined" 
          label="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: COLORS.primary,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign Up" : "Sign in"}
            color={COLORS.primary}
            onPress={handlePress}
            style={{height: 40}}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === "signUp"
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
      <StatusBar
        backgroundColor={COLORS.primary}
      />
    </View>
  );
}
