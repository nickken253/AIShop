const userId = sessionStorage.getItem("userId");
let cart = [];
if(userId) {
    const url = 'http://20.2.223.204:3031/api/cart/get-cart-items/' + userId;
const response = await fetch(url, {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  },
  
});
const data = await response.json();


if(data){
    cart = data;
}
}


const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            // Check if product already in cart
            const exist = state.find((x) => x.id === product.id)
            if(exist){
                // Increase the quantity
                return state.map((x)=>x.id ===product.id?{...x, qty: x.qty+1}:x)
            }
            else{
                return [...state, {...product, qty:1}]
            }
            break;
        case "DELITEM":
            const exist2 = state.find((x) => x.id === product.id)
            if(exist2.qty === 1){
                return state.filter((x)=>x.id!==exist2.id)
            }
            else{
                return state.map((x)=> x.id===product.id?{...x, qty:x.qty-1}:x)
            }
            break;

        default:
            return state
            break;
    }
}

export default handleCart