const order_items = document.querySelector(".order-items");
const summary  = document.querySelector(".summary");
const taxamt = document.querySelector(".taxamt");
const coup = document.querySelector(".coupon");
const shipCharges = 10;  // in dollars
let totalPrice = 0; //total order value
const Tax = 0.05;
let taxAmt = 0;
let items = 0;

//including the Cart  stored in localStorage in form of Strings and parsing
let Cart =  JSON.parse(localStorage.cart);
//console.log(Cart);
// for (let key in localStorage.cart) {
//     console.log(`${key}---${localStorage.cart[key]}`)
// }
// console.log(Cart[0].amount);
function checkCart() {
    if(Cart.length>0){
        return true;
    }
    else 
    {return false;}
}

function calcItemsCost(){
    if(checkCart()){
        for(let cartItem of Cart){
            items += cartItem.discountPrice * cartItem.amount;
        };
        order_items.innerHTML += "  " + parseInt(items);
        // console.log(items);
    }
    else {
        order_items.innerHTML += " " + "0";
        taxamt.innerHTML = taxAmt;
        console.log("Cart Empty!")}
}

function totalOrder() {
    var check = checkCart();
    if(check){
        taxAmt = ( items + shipCharges ) * Tax;
        taxamt.innerHTML = taxAmt;
        coup.innerHTML += "NO";
        totalPrice  = ( items + shipCharges) + taxAmt;
        summary.lastElementChild.innerHTML += " " + totalPrice;
        // console.log(Cart.length);
    } 
    else
    {
        summary.lastElementChild.innerHTML += " " + "0";
    }
   
}

calcItemsCost();
totalOrder();
localStorage.setItem('total_cart',totalPrice);
