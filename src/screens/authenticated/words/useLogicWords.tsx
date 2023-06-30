import { View, Text } from 'react-native';
import React from 'react';
import Sound from 'react-native-sound';
import axios from 'axios';
import { Apikey, VoiceApi } from '../../../network/const';

const useLogicWords = () => {
  const getVoiceUrl = async (voice?: any) => {
    var qs = require('qs');
    const data = {
      input: voice,
    };
    const res = await axios({
      url: VoiceApi,
      method: 'POST',
      headers: {
        Apikey: Apikey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    });
    if (res?.status === 200) {
      console.log('success', res?.data?.data?.url);

      const soundUrl = res?.data?.data?.url;
      // setUrl(soundUrl);
      return soundUrl;
    } else {
      console.log('error', res);
      return;
    }
  };

  const playSound = async (soundUrl: any) => {
    let sound = new Sound(soundUrl, null, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      sound.play();
    });
  };

  const handlePlaySound = async (item: any) => {
    if (item?.soundUrl) {
      playSound(item?.soundUrl);
    } else {
      const urls = await getVoiceUrl(item?.key);
      setTimeout(() => {
        playSound(urls);
      }, 2000);
    }
  };
  return { playSound, handlePlaySound };
};

export default useLogicWords;
