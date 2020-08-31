import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'

const EditProductScreen = props => {
    return (
        <ScrollView>
            <View>
                <Text style={styles.label}>TITLE</Text>
                <TextInput />

            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({

});

export default EditProductScreen;