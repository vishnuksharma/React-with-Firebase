import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base';

// const ThemeContex = React.createContext('theme');
class App extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
      const params = this.props.match.params;
      // read pre order from localStorage
      const localStorageOrderRef = localStorage.getItem(params.storeId);      
      if (localStorageOrderRef){
        this.setState({order: JSON.parse(localStorageOrderRef)});
      }
      this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
      });
    }

    componentDidUpdate () {
      console.log(this.state);
      localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount (){
      console.log('UNMOUNT APP')
      base.removeBinding(this.ref);
    }
    
    addFish = (fish) => {
        const fishes = {...this.state.fishes}        
        fishes[`fish${Date.now()}`] = fish;
        // console.log(fishes); return;
        this.setState({fishes});
    }

    loadSampleFishes = () =>{
      this.setState({fishes: sampleFishes});
    }

    updateFish = (key, updatedFish) => {
      // copy of fishes.
      const fishes = {...this.state.fishes};
      fishes[key] = updatedFish;
      this.setState({fishes});
    }

    deleteFish = (key) => {
      // copy of fishes
      const fishes = {...this.state.fishes};
      fishes[key] = null;
      this.setState({fishes});
    }

    removeFromOrder = key => {
      const order = {...this.state.order};
      delete order[key];
      this.setState({order});
      console.log('==', order);
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        console.log(order);
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
                <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order 
          order={this.state.order} 
          fishes={this.state.fishes} 
          removeFromOrder={this.removeFromOrder} />

        <Inventory 
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes} 
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}/>
      </div>
    );
  }
}

export default App;