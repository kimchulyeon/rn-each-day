import React, {useState} from 'react';
import {Brown, Gray} from '@/constants';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Feed} from '@/hooks/useFirestore';
import {formatRelativeTime, formatServerTimeToYYYYMMDDHHMM} from '@/lib/dayjs';

export default function FeedFooter({
  feed,
  foldable = true,
  fullDate = false,
}: {
  feed: Feed;
  foldable?: boolean;
  fullDate?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <View style={styles.infoContainer}>
        <Text style={styles.dateInfo}>
          {fullDate ? formatServerTimeToYYYYMMDDHHMM(feed.createdAt) : formatRelativeTime(feed.createdAt)}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={isExpanded || !foldable ? undefined : 3} style={styles.contentText}>
          {feed.content}
        </Text>
        {feed.content.split('\n').length > 3 && foldable && (
          <TouchableOpacity style={styles.moreButton} onPress={handleToggle}>
            <Text style={[styles.toggleText, !isExpanded && styles.highlight]}>{isExpanded ? '닫기' : '펼치기'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: 10,
  },
  dateInfo: {
    textAlign: 'right',
    fontSize: 12,
    color: Gray.SECONDARY,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    maxHeight: 150, // 최대 높이 설정
  },
  contentText: {
    lineHeight: 20,
  },
  toggleText: {
    color: Brown.Primary,
    marginTop: 5,
  },
  moreButton: {
    alignItems: 'center',
  },
  highlight: {
    borderWidth: 1,
    borderColor: Brown.Secondary,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 5,
  },
});
