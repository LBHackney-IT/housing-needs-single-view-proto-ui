import React, { Component } from 'react';

export default class Rent extends Component {
  formatCurrency(amount) {
    if (amount) {
      return `£${amount.toFixed(2)}`;
    } else {
      return '£---';
    }
  }

  render() {
    const { customer } = this.props;

    if (!customer.rentAccountRef) {
      return <></>;
    }
    return (
      <div className="quick-access__item">
        <h3>Rent</h3>
        <table>
          <tbody>
            <tr>
              <td>Account ref:</td>
              <td>{customer.rentAccountRef}</td>
            </tr>
            <tr>
              <td>Balance:</td>
              <td>{Utils.formatCurrency(customer.rentAccountBalance)}</td>
            </tr>
          </tbody>
        </table>
        <div className="quick-access__item__links">
          <ul>
            <li>
              <a href="#/">More details</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
