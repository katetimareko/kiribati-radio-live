import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext) => {
    const finalConfig = { 
        ...config,
        android: {
            ...config.android,
            googleServicesFile: process.env.GOOGLE_SERVICE_FILE_A
        },
        ios: {
            ...config.ios,
            googleServicesFile: process.env.GOOGLE_SERVICE_FILE_I
        }
    } as ExpoConfig
    
    return finalConfig
    
}
