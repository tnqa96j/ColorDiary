import Navigation from './src/navigation';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { config } from '@gluestack-ui/config';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import 'babel-polyfill';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GluestackUIProvider config={config}>
            <Navigation />
          </GluestackUIProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
