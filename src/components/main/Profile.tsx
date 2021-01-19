import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { connect } from 'react-redux';

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });

  return (
    <View style={$styles.container}>
      <Text>
        {currentUser.name
          ? `${currentUser.name} (${currentUser.email})`
          : currentUser.email}
      </Text>
      <View style={$styles.userInfoContainer}></View>
      <View style={$styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
}

const renderItem = (item) => {
  console.log('ITEM:', item);
  // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

  return (
    <View style={$styles.imageContainer}>
      <Image source={{ uri: item.data.downloadURL }} style={$styles.image} />
    </View>
  );
};

const $styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  userInfoContainer: {
    margin: '1rem',
  },
  galleryContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    margin: 2,
    height: 100,
    aspectRatio: 1 / 1,
    borderRadius: 2,
  },
});

const mapStateToProps = (store: {
  userState: { currentUser: any; posts: any };
}) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
