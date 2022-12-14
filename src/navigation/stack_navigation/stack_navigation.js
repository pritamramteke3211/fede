import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Chat from '../../screens/chat/Chat';
import GetLocation from '../../screens/getLocation/GetLocation';
import Home from '../../screens/home/Home';
import Login from '../../screens/login/Login';
import Match from '../../screens/match/Match';
import Message from '../../screens/message/Message';
import Modal from '../../screens/modal/Modal';

const Stack = createStackNavigator();

export default StackNav = () => {
  const logined = useSelector(state => state.authentication.login);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {logined ? (
        <>
          <Stack.Group>
            <Stack.Screen name="GetLocation" component={GetLocation} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Message" component={Message} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{presentation: 'modal', gestureEnabled: true}}>
            <Stack.Screen name="Modal" component={Modal} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen name="Match" component={Match} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};
