import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Box, Text } from "@react-native-material/core";
import {Button} from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";

import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {PhoneAuthProvider,signInWithCredential} from 'firebase/auth';
import { auth, firebaseConfig } from "../../firebase";

const PhoneScreen= () => {
  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const phoneInput = useRef(null);

  const recaptchaVerifier = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationID] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [formatedValue, setFormattedValue] = useState('');

  const [info, setInfo] = useState("");
  const attemptInvisibleVerification = false;

  const handleSendVerificationCode = async () => {
    try{
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
        );
        setVerificationID(verificationId);
        setInfo('Success : Verification code has been sent to your phone');
    }catch(error){
        setInfo(`Error : ${error.message}`);
    }
  };

  const handleVerifyVerificationCode = async () => {
    try{
        const credential = PhoneAuthProvider.credential(verificationId,verificationCode);
        await signInWithCredential(auth,credential);
        setInfo('Success: Phone authentication successful');
        navigation.navigate("emailPassword");
    }catch(error){
        setInfo(`Error : ${error.message}`);
    }
  }

  return (
    <Box 
        style={styles.container}
    >
      <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            androidHardwareAccelerationDisabled={true}
            androidLayerType="software"
            attemptInvisibleVerification
      />
      {/* {info && <Text>{info}</Text>} */}
      {console.log(info)}
      {!verificationId ? (
        <>
          <Box style={styles.btnc}>
            <SafeAreaView>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="DM"
                layout="first"
                onChangeText={(text) => {
                  setValue(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                  setPhoneNumber(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
              />
            </SafeAreaView>
          </Box>
          <Box style={styles.btnc} mt={10}>
            <Button style={{
                width: "80%",
                padding: 5
            }} variant="contained" title="Send Verification Code" 
            onPress={ () => handleSendVerificationCode()}
            disabled={!phoneNumber}
            />
          </Box>
        </>
      ) : (
        <View>
          <Text style={styles.text}>Enter the verification code</Text>
            <TextInput
              editable={!!verificationId}
              placeholder= "123456"
              onChangeText={setVerificationCode}
            />
            <Button
              title= "Confirm Verification Code"
              disabled={!verificationCode}
              onPress = {() => handleVerifyVerificationCode()}
            />
        </View>
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner/>}
    </Box>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapper: {},
    message: {},
    btnc: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {}
})

export default PhoneScreen;