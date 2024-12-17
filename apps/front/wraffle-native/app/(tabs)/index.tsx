import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@/shared/ui/constants/Colors';
import {WebView} from '@wraffle/bridge/src/index.native';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <WebView
        style={styles.webview}
        source={{
          uri: 'http://localhost:3000',
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: Colors.light.background,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
