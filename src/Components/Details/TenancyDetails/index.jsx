import React, { Component, Fragment } from 'react';

export default class TenancyDetails extends Component {
  lineBreakifyAddress(address) {
    return address.split('\n').map((line, i) => {
      return (
        <Fragment key={i}>
          {line}
          <br />
        </Fragment>
      );
    });
  }

  render() {
    const { customer } = this.props;

    return (
      <div className="details__left-column__item">
        <h2>Tenancy Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Known addresses:</td>
              <td>
                {customer.address.length > 0 ? (
                  customer.address.map((address, i) => {
                    return <p key={i}>{this.lineBreakifyAddress(address)}</p>;
                  })
                ) : (
                  <p>No data</p>
                )}
              </td>
            </tr>
            {/*             
              <tr>
                <td>Household member(s):</td>
                <td>
                {this.props.customer.household.length > 0 ? (
                  <ul>
                    {this.props.customer.household.map((p, i) => {
                      return (
                        <li key={i}>
                          {p.name} <br />
                          {p.relationship} {p.dob}
                        </li>
                      );
                    })}
                  </ul>) : (<p>No data</p>)}
                </td>
              </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}
