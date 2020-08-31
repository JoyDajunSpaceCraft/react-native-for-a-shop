//npm install --save moment
import * as momonet from 'moment'
class Order {

    constructor(id, items, totalAmount, date) {
        // order可以是一个商品出现多次
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
    get readableDate(){

        //转换为 可以显示在网页上的形式的 date         
        // return this.date.toLocaleDateString('en-EN',{
        //     year:'numeric',
        //     month:'long',
        //     day:'numeric',
        //     hour:'2-digit',
        //     minute:'2-digit'
        // });
        return moment(this.date).format('MMMM Do YYYY, hh:mms');
    }
}
export default Order;