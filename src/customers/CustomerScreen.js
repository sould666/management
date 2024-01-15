import React, { Component } from 'react';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
// Import any other necessary components or assets

class CustomerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            // any other state variables
        };
    }

    // Method to add a new customer
    handleAddCustomer = (newCustomer) => {
        this.setState({ customers: [...this.state.customers, newCustomer] });
    };

    render() {
        return (
            <div className="customer-screen">
                <AddCustomer onAddCustomer={this.handleAddCustomer} />
                <CustomerList customers={this.state.customers} />
                {/* You can add more UI elements here as needed */}
            </div>
        );
    }
}

export default CustomerScreen;