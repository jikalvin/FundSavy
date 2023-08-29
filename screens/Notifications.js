import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

const notifications = [
  { id: 1, message: 'Notification 1' },
  { id: 2, message: 'Notification 2' },
  { id: 3, message: 'Notification 3' },
  // Add more notifications here
];

const NotificationsScreen = () => {
  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            type="chat"
            description={item.message}
            key={item.id}
            user={"Notification"}
          />
        )}
      />
    </View>
  );
};

export default NotificationsScreen;
