import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        // any asyn code you want 
        try {
            const response = await fetch('https://rn-complete-guide-d23c6.firebaseio.com/product.json');
            // GET 是默认方法所以不用 写method 而且不需要 header和body

            if (!response.ok) {
                //检查response response.ok说明是200
                throw new Error('something is wrong ');
            }
            const resData = await response.json();
            const loadedProducts = []
            for (const key in resData) {
                loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
            }
            // console.log(resData)
            dispatch({
                // 这里dispatch相当于 return 值了 只是来源于 firebase
                type: SET_PRODUCTS, products: loadedProducts
            });
        }
        catch (error) {
            // send to custom analytics server
            throw error;
        }

    };
};

export const deleteProduct = productId => {
    // return {
    //     type: DELETE_PRODUCT,
    //     pid: productId
    // };
    return async dispatch => {
        // 在delete之前send request
        const response = await fetch(
            `https://rn-complete-guide-d23c6.firebaseio.com/product/${productId}.json`, {
            method: 'DELETE',//DELETE 没有header和body
        });
        if (!response.ok) {
            throw new Error("Something is wrong on delete!");
        }
        const resData = await response.json();
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });
    }
};


export const createProduct = (title, description, imageUrl, price) => {
    // return a promiss
    return async dispatch => {
        // any asyn code you want 
        const response = await fetch('https://rn-complete-guide-d23c6.firebaseio.com/product.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // 将js转化为json 
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData = await response.json();

        // console.log(resData)

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                // title:title,
                // description:description,
                // imageUrl:imageUrl,
                // price:price
                //当名字一样时不用再写赋值
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        }
        )
    }

};
export const updateProduct = (id, title, description, imageUrl) => { 
    return async dispatch => {
        // update data 需要在写完之后点击 空白 才能保存 
        const response = await fetch(
            // 要对js传入值时用``
            `https://rn-complete-guide-d23c6.firebaseio.com/product/${id}.json`,
            {
                method: 'PATCH',// PUT fully overwrite , PATCH update place where you tell the data
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    // 将js转化为json 
                    title,
                    description,
                    imageUrl
                })
            });
        if (!response.ok) {
            throw new Error("Something is wrong on update!");
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                // title:title,
                // description:description,
                // imageUrl:imageUrl,
                // price:price
                //当名字一样时不用再写赋值
                title,
                description,
                imageUrl
            }
        })
    }


}; 