import {React,useCallback} from 'react';
import {StyleSheet, View,Alert} from 'react-native';
import GPS from './components/GPS';
import {RenderPassReport, PerformanceProfiler} from '@shopify/react-native-performance';

const App = () => {
  const onReportPrepared = useCallback((report: RenderPassReport) => {
    console.log(report)
    Alert.alert(`Startup Time: ${report.timeToRenderMillis} ms`)
  }, []);
 return (
  <PerformanceProfiler onReportPrepared={onReportPrepared}>
     <View style={styles.container}>
     <GPS />
   </View>
  </PerformanceProfiler>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
});

export default App;
