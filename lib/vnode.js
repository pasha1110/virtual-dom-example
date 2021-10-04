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
  subscribers = new Set();

  depend() {
    if (activeEffect) this.subscribers.add(activeEffect);
  }

  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

function useState(obj) {
  Object.keys(obj).forEach((key) => {
    const dep = new Dep();
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return value;
      },

      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify();
        }
      },
    });
  });

  return obj;
}

export { h, mount, unmount, watchEffect, useState };
