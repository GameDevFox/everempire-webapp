import React from 'react';

import 'should';
import $ from '../../test/test-query';
import {renderToElement} from '../../test/react-utils';

import TableList from './table-list';

describe('TableList', () => {
  let table;

  describe('with simple columns', () => {
    beforeEach(() => {
      const template = [
        ['Name', 'name'],
        ['Gold', 'gold']
      ];

      const list = [{name: 'Adam', gold: 100}, {name: 'Baron', gold: 200}];
      table = renderToElement(<TableList list={list} template={template}/>);
    });

    it('should generate proper headers', () => {
      const headers = $(table).find('thead th').toHTML();
      headers.should.eql(['Name', 'Gold']);
    });

    it('should generate a proper body rows', () => {
      const rows = $(table).find('tbody tr').toArray();
      const contents = rows.map(row => $(row).find('td').toHTML());

      contents.should.eql([['Adam', '100'], ['Baron', '200']]);
    });
  });
});
