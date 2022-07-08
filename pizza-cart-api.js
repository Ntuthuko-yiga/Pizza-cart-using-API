document.addEventListener('alpine:init', () => {

    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {

        init() {

            axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
            .then((result) => {
                // console.log(results.data);
                this.pizzas = result.data.pizzas
            })
        },

        message : 'Eating pizzas',

        pizzas : [],

        add(pizza) {
            alert(pizza.flavour + " : "  + pizza.size + " : " + pizza.price) 
        }



      }
    })
})