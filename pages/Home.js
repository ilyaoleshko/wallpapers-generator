import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { AntDesign } from "@expo/vector-icons";
import ReactNativePickerModule from "react-native-picker-module";
import Slider from "@react-native-community/slider";

import Backdrop from "../components/Backdrop";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Navigation from "../components/Navigation";

import {
  getDefaultImage,
  getMonthsArray,
  pickerOptions,
  translations,
  wallpaperConfig,
} from "../common/constants";

import { styles, colors } from "../common/styles";

const Home = () => {
  const wallpaperRef = useRef(null);
  const pickerRef = useRef();
  const { width, height, scale } = Dimensions.get("screen");

  const rescaledDim = {
    width: width * scale,
    height: height * scale,
  };

  const defaultImage = getDefaultImage(rescaledDim.width, rescaledDim.height);
  const months = getMonthsArray();
  const currentDate = new Date().getMonth();

  const [month, setMonth] = useState(currentDate);
  const [wallpaper, setWallpaper] = useState(defaultImage);
  const [opacity, setBackdropOpacity] = useState(0.15);
  const [displaySettings, setDisplaySettings] = useState(false);

  const settingsImage = displaySettings ? "down" : "setting";
  const userMonthValue = month + 1 + "";

  useEffect(() => {
    async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(translations.permissions);
      }
    };
  }, []);

  const onSelectWallpaper = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (!result.cancelled) {
      setWallpaper(result.uri);
    }
  };

  const onUpdateWallpaper = () => {
    setWallpaper(getDefaultImage(rescaledDim.width, rescaledDim.height, true));
  };

  const onDownloadWallpaper = async () => {
    const wallpaper = await captureRef(wallpaperRef, wallpaperConfig);

    MediaLibrary.saveToLibraryAsync(wallpaper);
  };

  const onSettings = () => setDisplaySettings(!displaySettings);

  const onHideSettings = () => {
    if (!displaySettings) return;
    setDisplaySettings(false);
  };

  const onOpenPicker = () => pickerRef.current.show();

  const onSelectMonth = (value) => {
    setMonth(value - 1);
    onHideSettings();
  };

  const onRestOpacity = () => setBackdropOpacity(0.15);

  const onLoadingError = () => onUpdateWallpaper();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onHideSettings}>
        <View style={styles.container}>
          <ImageBackground
            ref={wallpaperRef}
            source={{ url: wallpaper }}
            style={styles.image}
            onError={onLoadingError}
          >
            <Backdrop opacity={opacity} />
            <Calendar selectedMonth={month} />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <Navigation>
        <Button onPress={onSelectWallpaper}>
          <AntDesign name="picture" size={24} color={colors.actionText} />
        </Button>
        <Button onPress={onDownloadWallpaper}>
          <AntDesign name="download" size={24} color={colors.actionText} />
        </Button>
        <Button onPress={onUpdateWallpaper}>
          <AntDesign name="reload1" size={24} color={colors.actionText} />
        </Button>
        <Button onPress={onSettings}>
          <AntDesign name={settingsImage} size={24} color={colors.actionText} />
        </Button>
      </Navigation>
      {displaySettings && (
        <Navigation advancedContainerStyle={styles.settingsContainer}>
          <ReactNativePickerModule
            pickerRef={pickerRef}
            value={userMonthValue}
            title={translations.selectorTitle}
            cancelButton={translations.cancel}
            confirmButton={translations.confirm}
            items={months}
            onValueChange={onSelectMonth}
          />
          <Button onPress={onOpenPicker}>
            <AntDesign name="calendar" size={24} color={colors.actionText} />
          </Button>
          <Button onPress={onRestOpacity}>
            <Slider
              style={styles.slider}
              minimumValue={0.0}
              value={opacity}
              maximumValue={1.0}
              minimumTrackTintColor={colors.actionText}
              onValueChange={setBackdropOpacity}
            />
          </Button>
        </Navigation>
      )}
    </View>
  );
};

export default Home;
