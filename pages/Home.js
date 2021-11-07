import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { AntDesign } from "@expo/vector-icons";
import ReactNativePickerModule from "react-native-picker-module";
import Slider from "@react-native-community/slider";

import Navigation from "../components/Navigation";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Backdrop from "../components/Backdrop";

import {
  wallpaperConfig,
  pickerOptions,
  getMonthsArray,
  translations,
  colors,
  getDefaultImage,
} from "../common/constants";

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
  const currentDate = new Date().getMonth() + 1;

  const [month, setMonth] = useState(currentDate);
  const [wallpaper, setWallpaper] = useState(defaultImage);
  const [opacity, setBackdropOpacity] = useState(0.15);
  const [displaySettings, setDisplaySettings] = useState(false);

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
    let result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (!result.cancelled) {
      setWallpaper(result.uri);
    }
  };

  const onUpdateWallpaper = () => {
    setWallpaper(getDefaultImage(rescaledDim.width, rescaledDim.height, true));
  };

  const onDownloadWallpaper = async () => {
    let wallpaper = await captureRef(wallpaperRef, wallpaperConfig);

    MediaLibrary.saveToLibraryAsync(wallpaper);
  };

  const onSettings = () => setDisplaySettings(!displaySettings);

  const onHideSettings = () => {
    if (!displaySettings) return;
    setDisplaySettings(false);
  };

  const onOpenPicker = () => pickerRef.current.show();

  const onSelectMonth = (value) => {
    setMonth(value);
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
          <AntDesign name="picture" size={24} color={colors.navigationText} />
        </Button>
        <Button onPress={onDownloadWallpaper}>
          <AntDesign name="download" size={24} color={colors.navigationText} />
        </Button>
        <Button onPress={onUpdateWallpaper}>
          <AntDesign name="reload1" size={24} color={colors.navigationText} />
        </Button>
        <Button onPress={onSettings}>
          <AntDesign
            name={displaySettings ? "down" : "setting"}
            size={24}
            color={colors.navigationText}
          />
        </Button>
      </Navigation>
      {displaySettings && (
        <Navigation advancedContainerStyle={styles.settingsContainer}>
          <Button onPress={onOpenPicker}>
            <AntDesign
              name="calendar"
              size={24}
              color={colors.navigationText}
            />
          </Button>
          <Button onPress={onRestOpacity}>
            <Slider
              style={styles.slider}
              minimumValue={0.0}
              value={opacity}
              maximumValue={1.0}
              minimumTrackTintColor={colors.navigationText}
              onValueChange={setBackdropOpacity}
            />
          </Button>
        </Navigation>
      )}
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={month}
        title={translations.selectorTitle}
        cancelButton={translations.cancel}
        confirmButton={translations.confirm}
        items={months}
        onValueChange={onSelectMonth}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  slider: {
    width: 200,
    flex: 1,
  },
  settingsContainer: {
    zIndex: 9,
    height: 220,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  debug: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
