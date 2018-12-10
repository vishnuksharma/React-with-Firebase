import React from 'react';
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';


class StorePicker extends React.Component {
    static propTypes = {
        history : PropTypes.object
    }
    // constructor () {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
    // goToStore(event){
    //     // Stop the form from submiting.
    //     event.preventDefault();
    //     // get the text from input
    //     console.log(this)
    // }
    myInput = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        const storeName = this.myInput.value.value
        // change page //store/
        this.props.history.push(`store/${storeName}`)
    }
    
    

    render () {
        return (
            <React.Fragment>
                <h2>Please Enter A Store</h2>
                <form className="store-selector" onSubmit={this.goToStore}>                
                    <input ref={this.myInput} defaultValue={getFunName()} type="text" required placeholder="Store Name" />
                    <button type="submit">Visit Store →</button>
                </form>
            </React.Fragment>
            
        )
    }
}

export default StorePicker;