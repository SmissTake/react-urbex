import React, { useState } from 'react';
import Toast from 'react-native-root-toast';

export default function PopMessage({ message, type }) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: type === 'success' ? 'green' : 'red',
});
}