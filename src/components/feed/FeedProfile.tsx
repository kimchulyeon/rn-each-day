import React from 'react';
import {Brown, Gray} from '@/constants';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function FeedProfile() {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('@/assets/example.jpeg')}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">
        EachDay
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Gray.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  profileName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
    color: Brown.Primary,
  },
});
