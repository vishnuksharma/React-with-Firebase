import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name:PropTypes.string,
            desc:PropTypes.string,
            status:PropTypes.string,
            price:PropTypes.number
        }),
        index : PropTypes.string,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func
    }
    
    handleChange = (event) => {
        
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        // console.log(updatedFish);
        this.props.updateFish(this.props.index, updatedFish);
    }
    render (){
        return(
            <div className="fish-edit">
                <input value={this.props.fish.name} 
                    name="name" 
                    ref={this.nameRef} 
                    type="text" 
                    placeholder="Name"
                    onChange={this.handleChange} 
                />
                <input 
                    name="price" 
                    ref={this.priceRef} 
                    type="text" 
                    placeholder="Price"
                    onChange={this.handleChange} 
                    value={this.props.fish.price}
                />
                <select value={this.props.fish.status} name="status" ref={this.statusRef} 
                    onChange={this.handleChange}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea
                    value={this.props.fish.desc} 
                    name="desc" 
                    ref={this.descRef} 
                    placeholder="Description" 
                    onChange={this.handleChange}
                />
                <input
                    name="image"
                    value={this.props.fish.image}
                    ref={this.imageRef}
                    type="text"
                    placeholder="Image"
                    onChange={this.handleChange}
                />
                <button onClick={()=>this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        ) 
    }
}

export default EditFishForm;