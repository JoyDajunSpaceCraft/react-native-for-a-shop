class Order {
    constructor(id, items, totalAmount, date) {
        // order可以是一个商品出现多次
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
    get readableDate(){
        return this.date.toLocaleDateString('en-EN',{
            year:'numeric',
            month:'long'
        });
    }
}
export default Order;