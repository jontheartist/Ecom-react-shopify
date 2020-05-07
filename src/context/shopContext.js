import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()


// https://github.com/Shopify/js-buy-sdk

const client = Client.buildClient({
    //storefrontAccessToken: 'your-storefront-access-token',
    storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
    // domain: 'your-shop-name.myshopify.com'
    domain: 'graphql.myshopify.com'
})


class ShopProvider extends Component {

    state = {
        products: [],
        product: {},
        checkout: {},
        isCart: false,
        test: 'test'
    }

    componentDidMount() {
        this.createCheckout()
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create()
        // console.log(checkout)
        this.setState({ checkout: checkout })

    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity, 10)

            }];


        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({ checkout: checkout })

    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState({ products: products })


    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({ product: product })
    }

    closeCart = () => { this.setState({ isCartOpen: false }) }

    openCart = () => { this.setState({ isCartOpen: true }) }


    render() {
        return (
            <div>
                <ShopContext.Provider value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithId: this.fetchProductWithId,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    addItemToCheckout: this.addItemToCheckout

                }}>
                    {this.props.children}

                </ShopContext.Provider>

            </div>
        )
    }
}


const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider



