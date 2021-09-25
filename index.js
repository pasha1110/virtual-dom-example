import { mount } from './vnode.js';
import { App, Home } from './App.js';
import Router from './vnode--router.js';

const route = new Router();
route.get('/App', function () {
  mount(document.getElementById('app'), App());
});
mount (document.getElementById("app"),Home())
route.init();
