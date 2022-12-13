import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {setLogin} from '../../store/feature/authentication/authentication';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AdIcon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-deck-swiper';
import generateId from '../../../lib/generateId';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const db = firestore().collection('users');
  const userData = useSelector(state => state.authentication.user_data);
  const [my_profile, setmy_profile] = useState(null);
  const swipeRef = useRef(null);
  const [profiles, setprofiles] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      dispatch(setLogin(false));
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    let all_user = [];
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id != userData.uid) {
            all_user.push(documentSnapshot.data());
          } else {
            setmy_profile(documentSnapshot.data());
          }
        });
        setprofiles(all_user);
      });
  };

  const filterPasses = async my_prof => {
    let passedUserIds = [];
    let swipedUserIds = [];

    let fltp = await db
      .doc(userData.uid)
      .collection('passes')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          passedUserIds = snapshot.docs.map(doc => doc.id);
        } else {
          passedUserIds = ['test'];
        }
      });

    let flts = await db
      .doc(userData.uid)
      .collection('swipes')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          swipedUserIds = snapshot.docs.map(doc => doc.id);
        } else {
          swipedUserIds = ['test'];
        }
      });

    let user_data = [];
    let fpr = await db;
    fpr = fpr.where('uid', 'not-in', [
      ...passedUserIds,
      ...swipedUserIds,
      my_prof.uid,
    ]);
    fpr.onSnapshot(snap => {
      snap.docs.map(doc => {
        if (doc.exists) {
          user_data.push(doc.data());
        }
      });

      setprofiles(user_data.filter(v => v.gender != my_prof.gender));
    });
  };

  const getMyData = async () => {
    let dbg = await db.doc(userData.uid).onSnapshot(snap => {
      setmy_profile(snap.data());
    });
  };

  useEffect(() => {
    if (my_profile) {
      filterPasses(my_profile);
    }
  }, [my_profile]);

  useLayoutEffect(() => {
    getMyData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getMyData();
    });
    return willFocusSubscription;
  }, []);

  const swipeLeft = async cardIndex => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    db.doc(userData.uid)
      .collection('passes')
      .doc(userSwiped.uid)
      .set(userSwiped);
  };

  const swipeRight = async cardIndex => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    try {
      let sw = await db
        .doc(userData.uid)
        .collection('swipes')
        .doc(userSwiped.uid)
        .set(userSwiped);
    } catch (err) {
      console.log('sw err', err);
    }

    try {
      let mt = await db
        .doc(userSwiped.uid)
        .collection('swipes')
        .doc(my_profile.uid)
        .get();
      if (mt._exists) {
        try {
          let mc = await firestore()
            .collection('matches')
            .doc(generateId(my_profile.uid, userSwiped.uid))
            .set({
              users: {
                [my_profile.uid]: my_profile,
                [userSwiped.uid]: userSwiped,
              },
              usersMatched: [my_profile.uid, userSwiped.uid],
              timestamp: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              navigation.navigate('Match', {
                my_profile,
                userSwiped,
              });
            });
        } catch (err) {
          console.log('mc err', err);
        }
      }
    } catch (err) {
      console.log('mt err', err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <TouchableOpacity style={{}} onPress={signOut}>
          <Image
            source={{uri: userData.photoURL, width: 35, height: 35}}
            borderRadius={25}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            style={{width: 60, height: 60}}
            source={require('../../../assets/img/logo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" color={'coral'} size={30} />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* Cards */}
      <View style={{flex: 1, marginTop: -6}}>
        <Swiper
          ref={swipeRef}
          containerStyle={{backgroundColor: 'transparent'}}
          cards={profiles}
          stackSize={3}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedAll={() => setprofiles([])}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  textAlign: 'left',
                  color: 'green',
                },
              },
            },
          }}
          renderCard={card =>
            card ? (
              <View
                key={card.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: 500,
                  position: 'relative',
                }}>
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                  }}
                  source={{uri: card.photoURL}}
                />
                <View
                  style={[
                    {
                      position: 'absolute',
                      bottom: 0,
                      backgroundColor: 'white',
                      width: '100%',
                      height: '20%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                    },
                    styles.cardShadow,
                  ]}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      {card.age}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={[
                  {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    height: 500,
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  styles.cardShadow,
                ]}>
                <Text style={{fontWeight: 'bold', paddingBottom: 20}}>
                  No More Profiles
                </Text>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                  }}
                  source={{uri: 'https://links.papareact.com/6gb'}}
                />
              </View>
            )
          }
          backgroundColor={'#4FD0E9'}
          onSwipedLeft={cardIndex => {
            setrefresh(!refresh);
            swipeLeft(cardIndex);
          }}
          onSwipedRight={cardIndex => {
            setrefresh(!refresh);
            swipeRight(cardIndex);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 29,
            width: 58,
            aspectRatio: 1,
            backgroundColor: '#ff00007b',
          }}
          onPress={() => swipeRef.current.swipeLeft()}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 29,
            width: 58,
            aspectRatio: 1,
            backgroundColor: '#00ff007a',
          }}
          onPress={() => swipeRef.current.swipeRight()}>
          <AdIcon name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
