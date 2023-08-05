import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export interface ButtonProps {
  children: React.JSX.Element
  onPress: () => void;
  type?: keyof typeof styles;
  style?: ViewStyle | TextStyle;
  color?: string
}

export const Control: React.FC<ButtonProps> = ({
  children,
  onPress,
  type = 'primary',
  style,
}) => {
  const animatableView = useRef<Animatable.View>()

  const bounce = () => animatableView.current?.pulse!(300).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  return (
    <TouchableWithoutFeedback onPress={async () => {
      await bounce()
      onPress()
    }}>
      <Animatable.View 
      ref={animatableView}
      style={{
        ...styles[type],
        ...style
      }}>
        {children}
      </Animatable.View>
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