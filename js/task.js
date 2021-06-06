function add_to_cart(element){
    element.addEventListener('click', function (item){
        let price = element.parentElement.parentElement.dataset.price;
        price = parseInt(price);
        let length_items = element.previousElementSibling.children[0].value;
        length_items = parseInt(length_items);
        if(length_items && price){
            const item = {
                number: length_items,
                price: price
            }
            elements.push(item);
            element.previousElementSibling.children[0].value = '';
            update_cart();
        }
        else{
            alert('Insert number of items');
        }
    });
}
function update_cart(){
    const input_length = document.getElementById('cart-length');
    const input_sum = document.getElementById('cart-sum');
    let array_length = 0;
    let array_sum = 0;
    if(elements.length > 0){
        elements.forEach(element => {
           array_length += element.number;
           array_sum += element.price * element.number;
        });
    }
    input_length.innerText = array_length;
    input_sum.innerText = array_sum;
}

function filter_elements(){
    body.style.opacity = 0.4;
    const cat = parseInt(select_cat.value);
    const price = parseInt(select_price.value);
    const products_arr = Array.prototype.slice.call(products);
    const products_box = document.querySelector('.products-box');

    filtered_elements = products_arr.filter(function (item){
       return (
           ( cat === -1 || parseInt(item.dataset.cat) === cat) &&
           (price === -1 || parseInt(item.dataset.price) < price)
       );
    });
    products_box.innerHTML = '';
    filtered_elements.forEach(item => {
        products_box.appendChild(item);
    })
    body.style.opacity = 1;
}


function add_select_listener(element){
    element.addEventListener('change', function (e){
        filter_elements();
    } );
}

let elements = [];
let filtered_elements = [];

let adds = document.querySelectorAll('.product-box__btn');
adds.forEach(element => add_to_cart(element) );

const products = document.querySelectorAll('.product-box__item');
const select_items = document.querySelectorAll('.select-control');
const body = document.getElementById('body');

const select_cat = document.getElementById('select-cat');
const select_price = document.getElementById('select-price');

select_items.forEach(element => add_select_listener(element));


//Popup
const popup_button = document.querySelector('.popup--open');
popup_button.addEventListener('click', function (){
    document.querySelector('.popup').style.display = 'flex';
});

const form_submit = document.getElementById('form-submit');

form_submit.addEventListener('click', function (e){
    e.preventDefault();
    if(elements.length === 0){
        alert('Add products to cart');
        return;
    }
    const form_name = document.getElementById('form-name');
    const form_email = document.getElementById('form-email');
    const val_name = form_name.value;
    const val_email = form_email.value;
    if((/\S/.test(val_name)) && (/\S/.test(val_email))){
        alert('Thanks for your order');
        const input_length = document.getElementById('cart-length');
        const input_sum = document.getElementById('cart-sum');
        input_length.innerText = 'XXX';
        input_sum.innerText = 'XXX';
        elements = [];
        document.querySelector('.popup').style.display = 'none';
    }
    else{
        alert('Fields couldn`t be empty');
    }
})