import { Provider } from 'react-redux';
import store from './store';
import MainLayout from './layouts/MainLayout/MainLayout';
import { LoginPage } from './features/auth';

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <LoginPage />
      </MainLayout>
    </Provider>
  );
}

export default App;