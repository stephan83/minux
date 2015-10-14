export default function createStore(handlers, initialState) {
  const subscribers = {};
  let state = initialState;
  let counter = 0;
  let timer;

  const store = {
    subscribe(listener) {
      const listenerId = counter++;
      subscribers[listenerId] = listener;
      return () => delete subscribers[listenerId];
    }
  };

  const notify = () => {
    Object.keys(subscribers).forEach(key => subscribers[key](state));
    timer = null;
  };

  const requestNotify = () => {
    if (!timer) {
      timer = setTimeout(notify, 0);
    }
  };

  const getState = () => JSON.parse(JSON.stringify(state));

  const setState = nextState => {
    state = nextState;
    requestNotify();
  };

  const context = {getState, setState};

  Object.keys(handlers).forEach(key => {
    store[key] = context[key] = (...args) => handlers[key].apply(context, args);
  });

  return store;
}
