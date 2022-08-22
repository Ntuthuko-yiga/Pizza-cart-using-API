document.addEventListener('alpine:init', () => {
  Alpine.data('pizzaCartWithAPIWidget', function () {
      return {
          init() {
              axios
                  .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                  .then((result) => {
                      this.pizzas = result.data.pizzas
                  })
                  .then(() => {
                      return this.createCart();
                  })
                  .then((result) => {
                      this.cartId = result.data.cart_code;
                  });
          },

          createCart() {
              return axios
                  .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
          },

          showCart() {
              const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`
              axios
                  .get(url)
                  .then((result) => {
                      this.cart = result.data;
                  });
          },

          pizzaImage(pizza) {
              return `/Images/${pizza.size}.jpeg`
          },

          message: 'Eating pizzas',
          username: 'Ntuthuko',
          pizzas: [],
          cartId: '',
          cart: {
              total: 0
          },

          add(pizza) {
              const params = {
                  cart_code: this.cartId,
                  pizza_id: pizza.id
              }

              axios
                  .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                  .then(() => {

                      this.message = "Pizza added to the cart"
                      this.showCart();

                  })
                  .catch(err => alert(err));
          }

      }
  })
})