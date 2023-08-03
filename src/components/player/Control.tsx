import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

export interface ButtonProps {
  iconName: string;
  size: number;
  onPress: () => void;
  type?: keyof typeof styles;
  style?: ViewStyle | TextStyle;
  color?: string
}

export const Control: React.FC<ButtonProps> = ({
  iconName,
  size,
  onPress,
  type = 'primary',
  style,
  color = 'white'
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        ...styles[type],
        ...style
      }}>
      <Ionicons name={`${iconName}`} color={color} size={size} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontWeight: '600',
    color: '#FFD479',
    padding: 20,
    textAlign: 'center',
  },
  secondary: {
    color: '#FFD479',
    alignContent: 'center',
    padding: 22,
    textAlign: 'center',
  },
});