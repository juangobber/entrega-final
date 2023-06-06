const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const addProductForm = document.getElementById('product-form')
const deleteProductDB = document.getElementById('')
const productContainerAdmin = document.getElementById('productContainerAdmin')
const seeCart = document.getElementById('seeCart')
const userProductList = document.getElementById('userProductList')
const cartProductList = document.getElementById('cartProductList')
const purchaseCart = document.getElementById('purchaseCart')

loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const loginFormData = new FormData(loginForm);
    const loginPayload = Object.fromEntries(loginFormData);
    fetch("/api/sessions/login", {
      method: "post",
      body: JSON.stringify(loginPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => window.location.href = '/profile');
    loginForm.reset();
  })

  registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const registerFormData = new FormData(registerForm);
    const registerPayload = Object.fromEntries(registerFormData);
    fetch("/api/sessions/register", {
      method: "post",
      body: JSON.stringify(registerPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => window.location.href = '/profile');
    registerForm.reset();
  });

  addProductForm?.addEventListener('submit', (event) => {
    event.preventDefault()

    const addProductFormData = new FormData(addProductForm)
    const addProductPayload = Object.fromEntries(addProductFormData);
    fetch("/api/products", {
      method: "post",
      body: JSON.stringify(addProductPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(()=> window.location.href = '/products');
    addProductForm.reset()
  })
  
  const logout = () => {
    window.location.href = '/api/sessions/logout';
  };

productContainerAdmin?.addEventListener('click', function(event){
    fetch(`/api/products/${event.target.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(()=> window.location.href = '/products');
})

seeCart?.addEventListener('click', function(event){
  window.location.href= '/cart'
})

productContainerAdmin?.addEventListener('click', function(event){
    fetch(`/api/products/${event.target.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(()=> window.location.href = '/products');
})

userProductList?.addEventListener('click', function(event){
  const cartId = event.target.parentNode.parentNode.parentNode.getAttribute('id')
  const productId = event.target.id

  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(()=> window.location.href = '/products');
  
})

cartProductList?.addEventListener('click', function(event){
  const cartId = event.target.parentNode.parentNode.parentNode.getAttribute('id')
  console.log("Esto se esta ejecutando")
  const productId = event.target.id
  console.log("cartId:", cartId)
  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(()=> window.location.href = '/cart');
})

purchaseCart?.addEventListener('click', function(event){
  const cartId = event.target.getAttribute('name')
  console.log(event.target.name)
  fetch(`/api/carts/${event.target.name}/purchase`, {
    method:'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => window.location.href = `/ticket/${response.ticket._id}`)
})