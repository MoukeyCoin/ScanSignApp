import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button, Card, Icon } from '@rneui/themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
       <Card>
          <Card.Title>Welcome to Scan Sign Technology</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0}}
            source={{
              uri:
                require("../../assets/images/welcome.jpg"),
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
