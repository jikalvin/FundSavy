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

  const navigation = useNavigation()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing:true
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image)
    }
  };



  return (
    <View style={styles.container}>
        <Stack spacing={8} style={{ margin: 16, width: "70%" }}>
            {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
            <Button variant='outlined' title="Pick Image" onPress={pickImage}/>
            <TextInput
              label="Email"
              value={email}
              variant='outlined'
              leading={props => <Icon name="account" {...props} />}
              onChange={setEmail}
            />
            <TextInput
              label="Password"
              variant="outlined"
              value={psd}
              trailing={props => (
                  <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
              )}
              onChange={setPsd}
            />
            <TextInput
              label="Confirm Password"
              variant="outlined"
              value={cpsd}
              trailing={props => (
                  <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
              )}
              onChange={setCpsd}
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