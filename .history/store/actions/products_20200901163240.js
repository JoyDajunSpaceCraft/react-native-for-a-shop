// export const DELETE_PRODUCT = 'DELETE_PRODUCT';
// export const CREATE_PRODUCT = 'CREATE_PRODUCT';
// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// export const deleteProduct = productId => {
//     return {
//         type: DELETE_PRODUCT,
//         pid: productId
//     };
// };
// export const createProduct = (title, description, imageUrl, price) => {
//     // return a promiss
//     return async dispatch => {
//         // any asyn code you want 
//         const  response = await fetch('https://rn-complete-guide-d23c6.firebaseio.com/product.json',{
//             method:'POST',
//             headers:{
//                 'Content-type':'application/json'
//             },
//             body:JSON.stringify({
//                 // 将js转化为json 
//                 title,
//                 description,
//                 imageUrl,
//                 price
//             })
//         });
//         const resData = await response.json();

//         // console.log(resData)

//         dispatch({
//             type: CREATE_PRODUCT,
//             productData: {
//                 // title:title,
//                 // description:description,
//                 // imageUrl:imageUrl,
//                 // price:price
//                 //当名字一样时不用再写赋值
//                 id:resData.name,
//                 title,
//                 description,
//                 imageUrl,
//                 price
//             }
//         }
//          )
//     }

// };
// export const updateProduct = (id, title, description, imageUrl) => {
//     console.log("in the actions :", title)
//     return {
//         type: UPDATE_PRODUCT,
//         pid: id,
//         productData: {
//             // title:title,
//             // description:description,
//             // imageUrl:imageUrl,
//             // price:price
//             //当名字一样时不用再写赋值
//             title,
//             description,
//             imageUrl
//         }
//     };
// }; 

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};
