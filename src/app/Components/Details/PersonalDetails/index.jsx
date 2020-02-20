import React, { Component } from 'react';
import moment from 'moment';

export default class PersonalDetails extends Component {
  render() {
    const { id, customer } = this.props;

    return (
      <div className="details__left-column__item">
        <h1>
          {customer.name && customer.name[0].title}{' '}
          {customer.name && customer.name[0].first}{' '}
          {customer.name && customer.name[0].last}
        </h1>
        <table>
          <tbody>
            <tr>
              <td>Date of birth:</td>
              <td>
                {customer.dob && moment(customer.dob[0]).format('DD/MM/YYYY')}
              </td>
            </tr>
            <tr>
              <td>National insurance no:</td>
              <td>{customer.nino}</td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <a
            href={`/customers/${id}/vulnerabilities`}
            role="button"
            className="govuk-button lbh-button"
          >
            Add vulnerable customer notes
          </a>
        </div>
      </div>
    );
  }
}
