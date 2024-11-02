import React from 'react';
import {Brown} from '@/constants';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FeedFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View>
          <Icon name="heart-outline" size={30} color={Brown.Primary} />
        </View>
        <View>
          <Icon name="chatbubbles-outline" size={30} color={Brown.Primary} />
        </View>
        <View>
          <Icon name="bookmark-outline" size={30} color={Brown.Primary} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text>Hello world</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});
