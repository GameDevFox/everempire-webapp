import React, {Component} from 'react';

import _ from 'lodash';
import {titleCase} from 'change-case';

export default class TableList extends Component {
  buildHeader(cols) {
    const headerCells = _.map(cols, (column, key) => {
      if(typeof column === 'string') {
        const columnParts = column.split('.');
        const header = titleCase(columnParts[columnParts.length - 1]);
        return <th key={key}>{header}</th>;
      }

      return <th key={key}>{column[0]}</th>;
    });
    return <tr>{headerCells}</tr>;
  }

  buildRows(rows, cols) {
    const tableRows = _.map(rows, (item, itemKey) => {
      const data = _.map(cols, (column, columnKey) => {
        let prop;
        if(typeof column === 'string') {
          prop = _.get(item, column);
        } else if(typeof column[1] === 'string') {
          prop = _.get(item, column[1]);
        } else if(typeof column[1] === 'function') {
          const func = column[1];
          prop = func.call(item, item);
        } else
          throw new Error(`Invalid column definition at index ${columnKey}: ${column}`);

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
