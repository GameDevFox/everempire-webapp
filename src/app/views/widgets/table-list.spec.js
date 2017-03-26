import React from 'react';

import 'should';
import $ from '../../test/test-query';
import {renderToElement} from '../../test/react-utils';

import TableList from './table-list';

describe('TableList', () => {
  let table;
  const rows = [
    {name: 'Adam', gold: 100},
    {name: 'Baron', gold: 200}
  ];

  describe('with string columns', () => {
    beforeEach(() => {
      const cols = ['name', 'gold'];
      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Name', 'Gold']);
    shouldGenerateProperRows([['Adam', '100'], ['Baron', '200']]);
  });

  describe('with simple columns', () => {
    beforeEach(() => {
      const cols = [
        'gold',
        ['Player Name', 'name']
      ];

      table = renderToElement(<TableList rows={rows} cols={cols}/>);
    });

    shouldGenerateProperHeaders(['Gold', 'Player Name']);
    shouldGenerateProperRows([['100', 'Adam'], ['200', 'Baron']]);
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
