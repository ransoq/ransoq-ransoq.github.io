import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, removeItem, addToCart} from '../../actions'
import WithRestoService from '../hoc';

const CartTable = ({items, deleteFromCart, removeItem, addToCart, RestoService}) => {

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
            {
                items.map(item => {
                    const {title, price, url, id, qtty} = item;
                    return (
                        <div key={id} className="cart__item">
                        <img src={url} className="cart__item-img" alt={title}></img>
                        <div className="cart__item-title">{title}</div>
                        <div onClick={() => removeItem(id)} className="cart__remove">&#8211;</div>
                        <div className="qtty">{qtty}</div>
                        <div onClick={() => addToCart(id)} className="cart__add">+</div>
                        <div className="cart__item-price">{price}$</div>
                        <div onClick={() => deleteFromCart(id)} 
                             className="cart__close">&times;</div>
                </div>
                    )
                })
            }
            </div>
            <button onClick={() => {RestoService.setOrder(generateOrder(items))}}className="order">Оформить заказ</button>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    removeItem,
    addToCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));