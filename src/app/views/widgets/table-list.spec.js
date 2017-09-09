import React from 'react';

import $ from '../../test/test-query';
import { renderToElement } from '../../test/react-utils';

import TableList from './table-list';

describe('TableList', () => {
  let table;
  const rows = [
    { name: 'Adam', gold: 100, data: { email: 'adam@gmail.com' }, colors: ['white', 'red'] },
    { name: 'Baron', gold: 200, data: { email: 'baron@everempire.com' }, colors: ['blue', 'black', 'yellow'] }
  ];

  it('should throw error on invalid column definition', () => {
    const cols = [12345, '<< '];
    const buildTable = () => renderToElement(<TableList rows={rows} cols={cols}/>);

    buildTable.should.throw('Invalid column definition at index 0: 12345');
  });

  describe('with string columns', () => {
    const cols = ['name', 'gold', 'data.email', 'colors[1]'];

    beforeEach(() => {
      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Name', 'Gold', 'Email', 'Colors 1']);
    shouldGenerateProperRows([['Adam', '100', 'adam@gmail.com', 'red'], ['Baron', '200', 'baron@everempire.com', 'black']]);
  });

  describe('with simple params', () => {
    const cols = [
      'gold',
      ['Player Name', 'name']
    ];

    beforeEach(() => {
      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Gold', 'Player Name']);
    shouldGenerateProperRows([['100', 'Adam'], ['200', 'Baron']]);
  });

  describe('with complex params', () => {
    const cols = [
      'name',
      ['Email', 'data.email'],
      ['First Color', 'colors[0]']
    ];

    beforeEach(() => {
      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Name', 'Email', 'First Color']);
    shouldGenerateProperRows([['Adam', 'adam@gmail.com', 'white'], ['Baron', 'baron@everempire.com', 'blue']]);
  });

  describe('with function params', () => {
    const cols = [
      'name',
      ['Mail Server',
        function() {
          return this.data.email.split('@')[1];
        }],
      ['Last Color',
        item => item.colors[item.colors.length - 1]]
    ];

    beforeEach(() => {
      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Name', 'Mail Server', 'Last Color']);
    shouldGenerateProperRows([['Adam', 'gmail.com', 'red'], ['Baron', 'everempire.com', 'yellow']]);
  });

  function shouldGenerateProperHeaders(data) {
    it('should generate proper headers', () => {
      const headers = $(table).find('thead th').toHTML();
      headers.should.eql(data);
    });
  }

  function shouldGenerateProperRows(data) {
    it('should generate a proper body rows', () => {
      const rows = $(table).find('tbody tr').toArray();
      const contents = rows.map(row => $(row).find('td').toHTML());

      contents.should.eql(data);
    });
  }
});
