import React, {Component} from 'react';

import _ from 'lodash';
import {titleCase} from 'change-case';

export default class TableList extends Component {
  buildHeader(cols) {
    const headerCells = _.map(cols, (column, key) => {
      if(typeof column === 'string')
        return <th key={key}>{titleCase(column)}</th>;

      return <th key={key}>{column[0]}</th>;
    });
    return <tr>{headerCells}</tr>;
  }

  buildRows(rows, cols) {
    const tableRows = _.map(rows, (item, itemKey) => {
      const data = _.map(cols, (column, columnKey) => {
        const propName = (typeof column === 'string') ? column : column[1];
        const prop = item[propName];

        return <td key={columnKey}>{prop}</td>;
      });
      return <tr key={itemKey}>{data}</tr>;
    });
    return tableRows;
  }

  render() {
    const {rows, cols} = this.props;

    const header = this.buildHeader(cols);
    const tableRows = this.buildRows(rows, cols);

    return (
      <table>
        <thead>{header}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  static get propTypes() {
    return {
      cols: React.PropTypes.array.isRequired,
      rows: React.PropTypes.array.isRequired
    };
  }
}
