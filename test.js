import createStore from './src/createStore';

const store = createStore({
  push(val) {
    const state = this.getState();
    state.push(val);
    this.setState(state);
  },
  pushAsync(val) {
    setTimeout(() => {
      this.push(val);
    }, 1000);
  }
}, []);

store.subscribe(console.log);

store.push(1);
store.push(2);
store.push(3);

store.pushAsync(4);
