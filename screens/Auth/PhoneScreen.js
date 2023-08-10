import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Box } from "@react-native-material/core";
import {Button} from "@react-native-material/core";

import { useNavigation } from "@react-navigation/native";

const PhoneScreen= () => {
  const [value, setValue] = useState("");
  const navigation = useNavigation()
  const phoneInput = useRef(null);
  return (
    <Box 
        style={styles.container}
    >
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
        }} variant="contained" title="Verify Phone Number" 
        onPress={() => navigation.navigate("emailPasswordr")}
        />
      </Box>
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
    }
})

export default PhoneScreen;