import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thisrupt.novena-evoting',
  appName: 'novena_vote',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
