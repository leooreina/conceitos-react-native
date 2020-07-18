import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "../services/api";
import { styles } from '../styles/App-styles';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
    .then(response => setRepositories(response.data))
    .catch(err => console.log(err))
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={ ({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              
              <View>
                <Text style={styles.repository}>{repository.title}</Text>
                <FlatList
                  data={repository.techs}
                  keyExtractor={tech => tech.id.toString()}
                  style={styles.techsContainer} 
                  renderItem={ ({ item: tech }) => (
                    <Text style={styles.tech}>{tech.name}</Text>
                  )}
                />
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-1`}
                >
                  3 curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(1)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-1`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
          {/* <Text style={styles.repository}>Repository 1</Text> */}

          {/* <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View> */}
      </SafeAreaView>
    </>
  );
}
