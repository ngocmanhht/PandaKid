import { View, Text } from 'react-native';
import React from 'react';
import Sound from 'react-native-sound';

const useLogicWords = () => {
  const playSound = async (soundUrl: any) => {
    let sound = new Sound(soundUrl, null, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      sound.play();
    });
  };
  return { playSound };
};

export default useLogicWords;
