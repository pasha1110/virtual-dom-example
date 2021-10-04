import { mount } from './lib/vnode.js';
import { App } from './src/App.js';

mount(document.querySelector('#app'), App());
