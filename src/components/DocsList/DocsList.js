import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "react-router-native";

export default class DocsList extends React.Component {
  render() {
    return (
      <View>
          <Link to="/doc/1">
            <Text>Documento 1</Text>
          </Link>

          <Link to="/doc/2">
            <Text>Documento 2</Text>
          </Link>

          <Link to="/doc/2">
            <Text>Documento 2</Text>
          </Link>
      </View>
    );
  }
}
