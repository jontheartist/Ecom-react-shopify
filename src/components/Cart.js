import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import { Div, SideDrawer, Text, Row, Col, Anchor } from 'atomize'
//https://atomizecode.com/docs/react/molecules/ //sidedrawer


export const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)




    return (
        <SideDrawer isOpen={isCartOpen} onClose={closeCart}>

            <Div d="flex" flexDir="column" m={{ b: "4rem" }}>

                {checkout.lineItems && checkout.lineItems.map(item => (
                    <Row key={item.id}>
                        <Col>
                            <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center center" h="5rem" w="4rem" />

                        </Col>

                        <Col>
                            <Text>{item.title}</Text>
                            <Text>{item.variant.title}</Text>
                            <Text>{item.quantity}</Text>
                        </Col>

                        <Col>
                            <Text>{item.variant.price}</Text>

                        </Col>


                    </Row>
                ))}
                <Anchor href={checkout.webUrl} target="_blank">Checkout</Anchor>


            </Div>


        </SideDrawer>
    )
}
