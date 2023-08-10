import React ,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, TextInput, Button, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


export default function App() {
  const [image,setImage]=useState(null)

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
            variant='outlined'
            leading={props => <Icon name="account" {...props} />}
            />
            <TextInput
            label="Password"
            variant="outlined"
            trailing={props => (
                <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
            />
            <TextInput
            label="Confirm Password"
            variant="outlined"
            trailing={props => (
                <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
            />
            <Button variant='contained' title="Sign Up"/>
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