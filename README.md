# Minux

Dead simple state container with minimal boilerplate.

## The gist

### Synchronous

```javascript
import createContainer from './src/createContainer';

// Container initial state
const initialState = {
  items: []
};

// A synchronous mutator
function add(val) {
  const state = this.getState();
  state.items.push(val);
  this.setState(state);
}

// Create a container for our todo list
const todo = createContainer({add}, initialState);

// Log the state when it changes
todo.subscribe(console.log);

// Bind actions to our todo container
const bound = todo.bind();

// Call some sync functions
bound.add('Item 1');
bound.add('Item 2');
bound.add('Item 3');

// Output:
// { items: [ 'Item 1', 'Item 2', 'Item 3' ] }
```

### Asynchronous

Nothing changes really.

```javascript
import createContainer from './src/createContainer';

// Container initial state
const initialState = {
  items: [],
  loading: false
};

// An asynchronous mutator
function fetch() {
  this.setState({...this.getState(), loading: true});
  // Simulate a remote fetch
  setTimeout(() => {
    this.setState({
      items: ['Remote item 1', 'Remote item 2'],
      loading: false
    });
  }, 1000);
}

// Create a container for our todo list
const todo = createContainer({fetch}, initialState);

// Log the state when it changes
todo.subscribe(console.log);

// Bind actions to our todo container
const bound = todo.bind();

// Call an async function
bound.fetch();

// Output:
// { items: [], loading: true }
// { items: [ 'Remote item 1', 'Remote item 2' ], loading: false }
```

## API

The API is minimal.

### Container

#### createContainer(handlers, initialState)

Creates a container for the given handlers and initial state.

#### Container#getState()

Returns a clone of the current state.

#### Container#subscribe(listener)

Subscribes to state changes. `listener` receives the new state. Returns a
function to unsubscribe.

The listener is called once per tick at most.

#### Container#bind(object = {})

Binds the store's handlers to an object. Returns the object.

### HandlerContext

The following context is attached to the handlers when they are executed.

In addition, `Container#bind` is called on the context, so handlers can call
other handlers including themselves.

#### HandlerContext#getState()

Returns a clone of the current state.

#### HandlerContext#setState(newState)

Replaces the current state.

## TODO

* Composition example
* React example

## License

MIT
