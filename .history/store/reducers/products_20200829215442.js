import PRODUCTS from '../../data/dummy-data';
import DELETE_PRODUCT from '../actions/products';
const initialState = {
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod =>prod.ownerId==='u1')
};
export default (state = initialState, action) =>{
    switch (action.type){
        case D
    }

    return state;
};