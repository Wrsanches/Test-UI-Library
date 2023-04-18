/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNUILib} from './components/RNUILib';
import {Gluestack} from './components/Gluestack';
import {Tamagui} from './components/Tamagui';
import {Elements} from './components/Elements';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const [lib, setLib] = React.useState('all');

  function renderLibs() {
    switch (lib) {
      case 'all':
        return (
          <View style={styles.view}>
            <TouchableOpacity
              onPress={() => {
                setLib('rnuilib');
              }}>
              <View style={styles.button}>
                <Text style={styles.text}>RNUILib</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLib('gluestack');
              }}>
              <View style={styles.button}>
                <Text style={styles.text}>Gluestack</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLib('tamagui');
              }}>
              <View style={styles.button}>
                <Text style={styles.text}>Tamagui</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLib('elements');
              }}>
              <View style={styles.button}>
                <Text style={styles.text}>RN Elements</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'rnuilib':
        return <RNUILib />;
      case 'gluestack':
        return <Gluestack />;
      case 'tamagui':
        return <Tamagui />;
      case 'elements':
        return <Elements />;
      default:
        return <></>;
    }
  }

  return (
    <GestureHandlerRootView style={styles.safeArea}>
      <SafeAreaView style={styles.safeArea}>
        {lib !== 'all' && (
          <TouchableOpacity
            onPress={() => {
              setLib('all');
            }}>
            <View style={styles.viewLink}>
              <Text style={styles.link}>Back</Text>
            </View>
          </TouchableOpacity>
        )}

        {renderLibs()}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2A5FE8',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  viewLink: {
    marginLeft: 10,
    marginTop: 10,
  },
  link: {
    fontSize: 16,
    color: '#2A5FE8',
  },
});

export default App;
