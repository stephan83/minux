export default function createContainer(handlers, initialState) {
  const subscribers = {};
  let state = initialState;
  let counter = 0;
  let timer;

  const notify = () => {
    Object.keys(subscribers).forEach(key => subscribers[key](state));
    timer = null;
  };

  const requestNotify = () => {
    if (!timer) {
      timer = setTimeout(notify, 0);
    }
  };

  const subscribe = listener => {
    const listenerId = counter++;
    subscribers[listenerId] = listener;
    return () => delete subscribers[listenerId];
  };

  const getState = () => JSON.parse(JSON.stringify(state));

  const setState = nextState => {
    state = nextState;
    requestNotify();
  };

  const context = {getState, setState};

  const bind = (object = {}) => {
    Object.keys(handlers).forEach(key => {
      object[key] = (...args) => handlers[key].apply(context, args);
    });
    return object;
  };

  bind(context);

  return {subscribe, bind};
}
