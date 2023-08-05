import * as React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';

export const MaterialHeaderButton = (props: HeaderButtonProps) => {
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    return (
      <HeaderButton
        testID="header-item"
        IconComponent={MaterialIcons}
        iconSize={23}
        // you can customize the colors, by default colors from react navigation theme will be used
        // color="red"
        // pressColor="blue"
        {...props}
      />
    )
  }