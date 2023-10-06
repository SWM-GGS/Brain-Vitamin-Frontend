import { Provider } from 'react-redux';
import store from './store/index.ts';
import AppInner from './AppInner.tsx';
import RouteChangeTracker from './modules/RouteChangeTracker.tsx';
import { useEffect } from 'react';

function App() {
  RouteChangeTracker();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
  }, []);

  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
