import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import Icon from 'react-native-vector-icons/Feather';

const IndexScreen = ( { navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context); 

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
              data={state}
              keyExtractor={blogPosts => blogPosts.title}
              renderItem={({ item }) => {
              return (
                  <TouchableOpacity 
                  onPress={() => navigation.navigate('Show', { id: item.id })}
                  >
              <View style={styles.row}>
                  <Text style={styles.title}>
                      {item.title} - {item.id} 
                  </Text>
                  <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Icon style={styles.icon} name="trash-2"></Icon>
                  </TouchableOpacity>
                  </View>
                  </TouchableOpacity>
              );
              }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {    
        headerRight: () =>
         <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Icon name="plus" size={30}></Icon>
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderTopWidth: 2,
        borderColor: 'gray'
    },
    title: {
        fontSize: 20
    },
    icon: {
        fontSize: 26
    }

});

export default IndexScreen;
