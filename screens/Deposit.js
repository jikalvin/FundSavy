import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createAPIUserAndKey } from 'mtn-momo-client';
import axios from 'axios';

const DepositScreen = () => {
  const [amount, setAmount] = useState('');
  const subscriptionKey = '1607b84b57e34096aafe664143e97c7c';

  const handleDeposit = async () => {
    const data = await axios.post('sandbox.momodeveloper.mtn.com', {
        primary_key: 'e49aed16e3684e09a82b990d63d51f41'
      });
    // const data = await createAPIUserAndKey({
    //     providerCallbackHost: 'http://localhost',
    //     subscriptionKey,
    // });
    console.log('Deposit amount:', data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deposit Money</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DepositScreen;
