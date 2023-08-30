import { Provider } from 'react-redux';
import store from './store/index.ts';
import AppInner from './AppInner.tsx';
import RouteChangeTracker from './modules/RouteChangeTracker.tsx';

function App() {
  RouteChangeTracker();

  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
