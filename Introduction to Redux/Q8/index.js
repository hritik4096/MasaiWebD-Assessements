import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store.js';
import { increment, decrement } from './actions.js';

function App() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Redux Counter App</h2>
      <h3>Current Count: {count}</h3>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
      </div>
      <pre style={{ marginTop: '20px' }}>
        State: {JSON.stringify({ count }, null, 2)}
      </pre>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
