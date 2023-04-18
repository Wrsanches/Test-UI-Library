import React, {useEffect} from 'react';
import {
  Button,
  Checkbox,
  Colors,
  GridList,
  Image,
  Picker,
  Spacings,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';
import {Alert, ScrollView, StyleSheet, Switch} from 'react-native';

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

export const RNUILib = () => {
  const [theme, setTheme] = React.useState('theme1');
  const [option, setOption] = React.useState('');
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getProducts();

    switch (theme) {
      case 'theme1':
        Colors.loadColors({
          primary: '#FF6B6B',
          secondary: '#FFE3E3',
        });
        break;
      case 'theme2':
        Colors.loadColors({
          primary: '#20C997',
          secondary: '#E6FCF5',
        });
        break;
      case 'theme3':
        Colors.loadColors({
          primary: '#FF922B',
          secondary: '#FFF4E6',
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

  return (
    <View flex-1>
      <View bg-primary marginT-10>
        <View row spread paddingH-10 paddingV-10>
          <Button label="Theme 1" onPress={() => setTheme('theme1')} />
          <Button label="Theme 2" onPress={() => setTheme('theme2')} />
          <Button label="Theme 3" onPress={() => setTheme('theme3')} />
        </View>
        <View row spread paddingH-10 paddingV-10>
          <Button label="List" onPress={() => setOption('list')} />
          <Button label="Form" onPress={() => setOption('form')} />
          <Button label="None" onPress={() => setOption('')} />
        </View>
      </View>

      <View flex-1 paddingT-20 bg-secondary>
        {data && option === 'list' && (
          <GridList
            data={data}
            numColumns={1}
            itemSpacing={Spacings.s8}
            listPadding={Spacings.s5}
            renderItem={({item}: {item: Product}) => {
              return (
                <View key={item.id} row>
                  <Image
                    source={{
                      uri: 'https://i.dummyjson.com/data/products/22/1.jpg',
                    }}
                    style={styles.image}
                  />
                  <View flex-1 marginL-10>
                    <Text text70BO>{item.title}</Text>
                    <Text marginT-5 grey20>
                      {item.body}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}

        {option === 'form' && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.form}>
            {[...Array(20)].map(() => {
              return (
                <TextField
                  placeholder={'Product Title'}
                  floatingPlaceholder
                  showCharCounter
                  maxLength={30}
                />
              );
            })}

            {[...Array(20)].map(() => {
              return <Checkbox value={true} marginT-10 />;
            })}

            {[...Array(20)].map(() => {
              return <Switch value={true} style={styles.switch} />;
            })}

            {[...Array(20)].map(() => {
              return (
                <Picker label="Picker" placeholder="Pick a Language" marginT-10>
                  {options.map(item => (
                    <Picker.Item
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      disabled={item.disabled}
                    />
                  ))}
                </Picker>
              );
            })}

            <Button
              label="Submit"
              marginT-20
              onPress={() => {
                return Alert.alert('Sent');
              }}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  switch: {
    marginTop: 10,
  },
});
