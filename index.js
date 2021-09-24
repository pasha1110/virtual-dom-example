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
    vnode.children.forEeach((child) => {
      mount(el, child);
    });
  }

  root.appendChild(el);
}

// function unmount() {}

mount(document.getElementById('app'), h('h1', null, 'Hello World'));
