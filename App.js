import { h } from './vnode.js';

function Button(text, color = '#1abc9c') {
  return h('button', {}, text);
}

function Div(children) {
  return h('div', null, children);
}

// component
function App() {
  return Button('Button');
}

export default App;
