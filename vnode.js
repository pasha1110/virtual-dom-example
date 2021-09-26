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

var activeEffect;

function watchEffect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

class Dep {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) this.subscribers.add(activeEffect);
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  get value() {
    this.depend();
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    this.notify();
  }
}

export { h, mount, unmount, watchEffect};
