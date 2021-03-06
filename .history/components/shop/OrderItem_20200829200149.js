import React ,{useState}from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';


const OrderItem = props => {
    cosnt [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.OrderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title='show details' onPress={() =>{
                setShowDetails(prevState => !prevState) // prevState 是基于原来的state不论是true还是false
            }}/>
        </View>
    )
};
const styles = StyleSheet.create({
    OrderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems:'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom:15
    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize:16   
    },
    date:{
        fontFamily:'open-sans',
        fontSize:16,
        color:'#888'
    }


});

export default OrderItem;