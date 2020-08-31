import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'

const EditProductScreen = props => {
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({

});

export default EditProductScreen;