import './style.css';

function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

function mount(root, vnode) {
  const el = (vnode.el = document.createElement(vnode.tag));

  for (var prop in vnode.props) {
    el.setAttribute(prop, vnode.props[prop]);
  }

  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else {
    vnode.children.forEach((child) => {
      mount(el, child);
    });
  }

  root.appendChild(el);
}

function unmount(vnode) {
  vnode.el.parentNode.removeChild(vnode.el);
}

function Button(text) {
  return h('button', {}, text);
}

// component
function App() {
  return Button('Click me');
}

// render
mount(document.getElementById('app'), App());