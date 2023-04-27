import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  CheckBox,
  ThemeProvider,
  Input,
  Switch,
  createTheme,
  useTheme,
} from '@rneui/themed';

type Product = {
  id: number;
  title: string;
  body: string;
};

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'},
];

const RENDER_COMPONENTS_COUNT = 20;

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

  const dynamicContentContainerStyles = {
    backgroundColor: themeFromHook.colors.secondary,
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

        <View style={[styles.contentContainer, dynamicContentContainerStyles]}>
          {data && option === 'list' && <></>}

          {option === 'form' && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.form}>
              {[...Array(RENDER_COMPONENTS_COUNT)].map((_, index) => {
                return (
                  <Input
                    key={index}
                    placeholder={'Product Title'}
                    maxLength={30}
                  />
                );
              })}

              {[...Array(RENDER_COMPONENTS_COUNT)].map((_, index) => {
                return (
                  <CheckBox
                    key={index}
                    checked={true}
                    style={styles.checkbox}
                  />
                );
              })}

              {[...Array(RENDER_COMPONENTS_COUNT)].map((_, index) => {
                return (
                  <Switch key={index} value={true} style={styles.switch} />
                );
              })}

              {/* TODO: add a picker equivalent */}

              <Button
                title="Submit"
                onPress={() => console.log('TODO: open dialog')}
                style={styles.submitButton}
              />
            </ScrollView>
          )}
        </View>
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
    padding: 10,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },

  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  checkbox: {
    marginTop: 10,
  },
  switch: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 10,
  },
});
