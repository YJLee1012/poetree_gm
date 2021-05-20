import { combineReducers } from 'redux';

import posts from './posts'
import auth from './auth';
import comments from './comments';
import images from './images';
import hashmyposts from './hashmyposts';
import imageposts from './imageposts'
import events from './events'


export const reducers = combineReducers({  
    posts, auth , comments, images, hashmyposts, imageposts,events
});