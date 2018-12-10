import React from "react";
import { formatPrice } from "../helpers";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {
  static propTypes = {
    fishes : PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    if (!fish) return null;
    const isAvailable = fish.status === "available";
    // const transitionOptions = {
    //   className: 'order',
    //   key,
    //   timeout: {enter:250, exit:250}
    // }
    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{enter:250, exit:250}} >
        <li key={key}>
          Sorry {fish ? <strong>{fish.name}</strong> : "Fish"} is no longer
          available.
        </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition classNames="order" key={key} timeout={{enter:250, exit:250}} >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition 
                  classNames="count" 
                  key={count} 
                  timeout={{enter:250, exit:250}}
                >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={()=>this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </TransitionGroup>
        <div className="total">
          Total: 
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
