const Config = {
  apiUrl: 'http://192.168.1.65:3000',
  enableHiddenFeatures: true,
}

if (process.env.APP_ENV === 'production') {
  Config.apiUrl =
    'https://iomis-pos-restaurant-admin-8a11tbb4r-cwirl.vercel.app'
  Config.enableHiddenFeatures = false
} else if (process.env.APP_ENV === 'staging') {
  Config.apiUrl =
    'https://iomis-pos-restaurant-admin-8a11tbb4r-cwirl.vercel.app'
  Config.enableHiddenFeatures = true
}

export default {
  expo: {
    name: 'Restaurante',
    slug: 'iomis-restaurant-pos',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    owner: 'testing.wc',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/97a31ad9-77b4-417d-bbcf-52c124793459',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.testing.wc.iomisrestaurantpos',
      buildNumber: '1.0.0',
      supportsTablet: true,
    },
    android: {
      package: 'com.testing.wc.iomisrestaurantpos',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '97a31ad9-77b4-417d-bbcf-52c124793459',
      },
      ...Config,
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
}
