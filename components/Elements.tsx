import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, ThemeProvider, createTheme, useTheme} from '@rneui/themed';

// we can specify our basic custom theme here
const rneuiTheme = createTheme({});

export const Elements = () => {
  return (
    <ThemeProvider theme={rneuiTheme}>
      <ElementsComponentWithProvider />
    </ThemeProvider>
  );
};

const ElementsComponentWithProvider = () => {
  const [theme, setTheme] = React.useState('theme1');
  const [option, setOption] = React.useState('');
  const [data, setData] = React.useState([]);

  const {updateTheme, theme: themeFromHook} = useTheme();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    switch (theme) {
      case 'theme1':
        updateTheme({
          lightColors: {
            primary: '#FF6B6B',
            secondary: '#FFE3E3',
          },
        });
        break;
      case 'theme2':
        updateTheme({
          lightColors: {
            primary: '#20C997',
            secondary: '#E6FCF5',
          },
        });
        break;
      case 'theme3':
        updateTheme({
          lightColors: {
            primary: '#FF922B',
            secondary: '#FFF4E6',
          },
        });
        break;
    }
  }, [theme]);

  const getProducts = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const dynamicContainerStyles = {
    backgroundColor: themeFromHook.colors.primary,
  };

  return (
    <ThemeProvider theme={rneuiTheme}>
      <View style={[styles.container, dynamicContainerStyles]}>
        <View style={styles.buttonRow}>
          <Button title="Theme 1" onPress={() => setTheme('theme1')} />
          <Button title="Theme 2" onPress={() => setTheme('theme2')} />
          <Button title="Theme 3" onPress={() => setTheme('theme3')} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="List" onPress={() => setOption('list')} />
          <Button title="Form" onPress={() => setOption('form')} />
          <Button title="None" onPress={() => setOption('')} />
        </View>

        {data && option === 'list' && <></>}

        {option === 'form' && <></>}
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
