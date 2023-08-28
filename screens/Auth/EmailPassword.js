import React ,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, TextInput, Button, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

import { signIn, signUp } from '../../firebase';


export default function App() {
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState("")
  const [psd, setPsd] = useState("")
  const [cpsd, setCpsd] = useState("")

  return (
    <View style={styles.container}>
        <Stack spacing={8} style={{ margin: 16, width: "70%" }}>
            <TextInput
              label="Email"
              value={email}
              variant='outlined'
              leading={props => <Icon name="account" {...props} />}
              onChangeText={setEmail}
            />
            <TextInput
              label="Password"
              variant="outlined"
              value={psd}
              trailing={props => (
                  <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
              )}
              onChangeText={setPsd}
            />
            <TextInput
              label="Confirm Password"
              variant="outlined"
              value={cpsd}
              trailing={props => (
                  <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
              )}
              onChangeText={setCpsd}
            />
            <Button 
              variant='contained' 
              title="Sign Up"
              onPress={async () => {
                if(email === "" || psd === "" || cpsd === "") return
                if(psd != cpsd) {console.log("Passwords don't match")}else{
                  console.log(email, psd)
                  await signUp(email, psd)
                  console.log("Completed")
                }
              }}
            />
        </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});