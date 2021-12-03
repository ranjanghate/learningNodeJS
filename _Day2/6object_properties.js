// Object Property shorthand

const name = 'alx';
const age = '22';

const user1 = {
  name: name,
  age: age
};

console.log(user1);

const user2 = {
  name,
  age
};

// Object destructuring

const product = {
  label: 'Book',
  price: '25',
  stock: '201',
  salePrice: '30'
};

// const label = product.label
// const price = product.price

const {label, stock, price: productPrice, rating = 4.5} = product;
// rating = 4.5 is a default value of rating variable, if there is no property name 'rating' in product then rating value 4.5 else it will be overwrite

console.log(label); // Book
console.log(stock); // 201
console.log(productPrice); // 25
console.log(rating); // 25


const transaction = (type, {label, salePrice}) => {
  console.log(type, label, salePrice);
}

transaction('order', product);
