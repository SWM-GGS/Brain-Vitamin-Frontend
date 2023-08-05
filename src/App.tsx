import { Provider } from 'react-redux';
import store from './store/index.ts';
import AppInner from './AppInner.tsx';

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
