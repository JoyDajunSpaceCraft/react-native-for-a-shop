import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'

const EditProductScreen = props => {
    return (
        <ScrollView>
            <View style={styles.control}>
                <Text style={styles.label}>TITLE</Text>
                <TextInput style={styles.input}/>

            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({

});

export default EditProductScreen;