import React, {Component} from 'react';

import _ from 'lodash';

export default class TableList extends Component {
  buildHeader(template) {
    const thList = _.map(template, column => {
      return <th key={column[0]}>{column[0]}</th>;
    });
    return <tr>{thList}</tr>;
  }

  buildRows(list, template) {
    const rows = _.map(list, (item, itemKey) => {
      const data = _.map(template, (column, columnKey) => {
        const propName = column[1];
        const prop = item[propName];
        return <td key={columnKey}>{prop}</td>;
      });
      return <tr key={itemKey}>{data}</tr>;
    });
    return rows;
  }

  render() {
    const {list, template} = this.props;

    const header = this.buildHeader(template);
    const rows = this.buildRows(list, template);

    return (
      <table>
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  static get propTypes() {
    return {
      template: React.PropTypes.array.isRequired,
      list: React.PropTypes.array.isRequired
    };
  }
}
