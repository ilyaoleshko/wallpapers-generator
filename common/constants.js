import { MediaTypeOptions } from "expo-image-picker";
import { Platform, NativeModules } from "react-native";

export const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale.replace(/_/, "-") ||
      NativeModules.SettingsManager.settings.AppleLanguages[0].replace(/_/, "-")
    : NativeModules.I18nManager.localeIdentifier;

export const shortLocale = locale.split("-")[0];

export const translations =
  shortLocale === "ru"
    ? {
        permissions:
          "Извините, нам нужны разрешения для камеры, чтобы это работало!",
        selectorTitle: "Выберите месяц",
        cancel: "Отмена",
        confirm: "Выбрать",
      }
    : {
        permissions:
          "Sorry, we need camera roll permissions to make this work!",
        selectorTitle: "Select a month",
        cancel: "Cancel",
        confirm: "Confirm",
      };

export const wallpaperConfig = {
  result: "tmpfile",
  quality: 1,
  format: "jpg",
};

export const pickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: false,
  aspect: [9, 16],
  quality: 1,
};

export const getRandomId = () => Math.floor(Math.random() * (900 - 1 + 1)) + 1;

export const getDefaultImage = (width, height, withId = false) => {
  const source = "picsum.photos";
  return withId
    ? `https://${source}/id/${getRandomId()}/${width}/${height}/`
    : `https://${source}/${width}/${height}/`;
};

export const toUpper = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getMonthsArray = () =>
  [...Array(12).keys()].map((e, i) => {
    const string = new Date(null, i + 1, null).toLocaleDateString(shortLocale, {
      month: "long",
    });

    return { value: i + 1, label: toUpper(string) };
  });

export const convertToMatrix = (list, size = 7) => {
  let i = 0;
  let k = -1;
  let matrix = [];

  for (i, k; i < list.length; i++) {
    if (i % size === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
};
