import * as devConfig from './config.dev'
import * as prodConfig from './config.prod'

let config;
if(process.env.NODE_ENV === 'production') {
    config = prodConfig;
}
else {
    config = devConfig;
}

export default config;