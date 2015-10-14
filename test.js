import createContainer from './src/createContainer';

const initialState = {
  items: [],
  loading: false
};

function add(val) {
  const state = this.getState();
  state.items.push(val);
  this.setState(state);
}

function fetch() {
  this.setState({...this.getState(), loading: true});
  setTimeout(() => {
    this.setState({
      items: ['Remote item 1', 'Remote item 2'],
      loading: false
    });
  }, 1000);
}

const todo = createContainer({add, fetch}, initialState);
const actions = todo.bindActions();

todo.subscribe(console.log);

actions.add('Item 1');
actions.add('Item 2');
actions.add('Item 3');

actions.fetch();
