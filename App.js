import { h } from './vnode.js';
// component
function App(){
  return h("h1",null,`hello world`)
}

function Home(){
  return h('h1',null,"home")
}

export {
  App,Home
};