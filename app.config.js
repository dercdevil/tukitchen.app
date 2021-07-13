import "dotenv/config";

export default {
  name: "Voraz",
  slug: "Voraz",
  platforms: ["ios", "android", "web"],
  version: "1.0.1",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./src/assets/images/app-icon.png",
  scheme: "voraz",
  splash: {
    image: "./src/assets/images/app-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  "android": {
    "package": "com.voraz.voraz",
    "config": {
      "googleMaps": {
        "apiKey": "AIzaSyAkQXpukXTieZJnQxiiG2HTcyiBDe42GY8"
      }
    },
    versionCode:3
  },
  extra: {
    TUKITCHEN_API_URL: process.env.EXPO_TUKITCHEN_CORE_API_URL 
  },
}
