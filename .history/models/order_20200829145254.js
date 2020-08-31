class Order{
    constructor(id, items, totalAmount,date){
        // order可以是一个商品出现多次
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date; 

    }

}
export default Order;