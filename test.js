import createContainer from './src/createContainer';

// Container initial state
const initialState = {
  items: [],
  loading: false
};

// A synchronous mutator
function add(val) {
  const state = this.getState();
  state.items.push(val);
  this.setState(state);
}

// An asynchronous mutator
function fetch() {
  this.setState({...this.getState(), loading: true});
  setTimeout(() => {
    this.setState({
      items: ['Remote item 1', 'Remote item 2'],
      loading: false
    });
  }, 1000);
}

// Create a container for our todo list
const todo = createContainer({add, fetch}, initialState);

// Log the state everytime it changes
todo.subscribe(console.log);

// Bind functions to our todo container
const bound = todo.bind();

// Call some sync
bound.add('Item 1');
bound.add('Item 2');
bound.add('Item 3');

// Call an async function
bound.fetch();

// Output:
// { items: [ 'Item 1', 'Item 2', 'Item 3' ], loading: true }
// { items: [ 'Remote item 1', 'Remote item 2' ], loading: false }
