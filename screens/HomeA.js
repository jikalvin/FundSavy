import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View, ScrollView } from "react-native";
import { FundGroupsList, NjangiGroupsList, NotificationsList, TransactionsList } from "../utils";
import { useNavigation } from "@react-navigation/native";

export default function(){
    const navigation = useNavigation()
    
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => item.scrn && navigation.navigate(item.scrn)} key={item.id} style={[styles.tone, styles.rates]}>
        {item.icon}
        <Text
          style={styles.text}
        >{item.Title}</Text>
      </TouchableOpacity>
    );

    return(
        <ScrollView>
          <View style={styles.main}>
            <FlatList
                horizontal
                data={NotificationsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={{flexDirection: "row", marginTop: 10}}>
              <View style={styles.line} />
                <Text>Njangi Groups</Text>
              <View style={styles.line} />
            </View>
            <FlatList
                horizontal
                data={NjangiGroupsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={{flexDirection: "row", marginTop: 10}}>
              <View style={styles.line} />
                <Text>Fund Groups</Text>
              <View style={styles.line} />
            </View>
            <FlatList
                horizontal
                data={FundGroupsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={{flexDirection: "row", marginTop: 10}}>
              <View style={styles.line} />
                <Text>Transactions</Text>
              <View style={styles.line} />
            </View>
            <FlatList
                horizontal
                data={TransactionsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    // padding: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  tone: {
    height: 135,
    width: 135,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800"
  },
  rates: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  transfer: {
    backgroundColor: "#80FFDB",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
})