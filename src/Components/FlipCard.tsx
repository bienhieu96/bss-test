import React, {useState} from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

type CardItem = {
  avatar: string;
  id: string;
  first_name: string;
  last_name: string;
  employment: any;
  email: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
};

type FlipCardProps = {
  item: CardItem;
  index: number;
};

const FlipCard: React.FC<FlipCardProps> = ({item}) => {
  const rotate = useSharedValue(0);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {duration: 1000}),
        },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={[styles.frontStyle, frontAnimatedStyles]}>
        <Pressable
          style={styles.flipCard}
          onPress={() => (rotate.value = rotate.value ? 0 : 1)}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: item.avatar}}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.firstNameStyle}>{item.first_name}</Text>
            <Text>{item.employment.title}</Text>
          </View>
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.backStyle, backAnimatedStyles]}>
        <Pressable
          style={styles.infoContainer}
          onPress={() => (rotate.value = rotate.value ? 0 : 1)}>
          <View style={styles.info}>
            <Text style={styles.email}>Email: {item.email}</Text>
            <Text>Phone number: {item.phone_number}</Text>
            <Text>Social insurance number: {item.social_insurance_number}</Text>
            <Text>Date of Birth: {item.date_of_birth}</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  frontStyle: {
    backfaceVisibility: 'hidden',
  },
  backStyle: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  imageContainer: {width: '100%', height: 200, alignItems: 'center'},
  flipCard: {flex: 1, paddingVertical: 20},
  avatar: {width: '80%', height: '100%'},
  infoContainer: {width: '100%', height: 200},
  firstNameStyle: {fontWeight: 'bold'},
  nameContainer: {paddingHorizontal: 15},
  info: {justifyContent: 'center', paddingHorizontal: 15},
  email: {fontWeight: 'bold'},
});
export default FlipCard;
