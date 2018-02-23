import { logger } from 'react-native-logger'
import Moment from 'moment';

export function log(message){
    logger.log(Moment().format(),message);
}