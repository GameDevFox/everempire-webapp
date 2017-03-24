import React, {Component} from 'react';

import $ from 'jquery';
import EmpireService from '../services/empire-service';

export default class Worlds extends Component {
  constructor() {
    super();

    this.state = {
      worlds: []
    };
  }

  componentWillMount() {
    const empireService = new EmpireService($, 'http://localhost:3000');
    empireService.getWorlds()
      .then(worlds => this.setState({worlds}));
  }

  render() {
    const tableRows = this.state.worlds.map(world => {
      return (
        <tr key={world.id}>
          <td>{world.id}</td>
          <td>{world.name}</td>
          <td>{world.user.email}</td>
        </tr>
      );
    });

    return (
      <div className="worlds">
        <h2>World List</h2>

        <table>
          <thead><tr>
            <th>Id</th>
            <th>Name</th>
            <th>User</th>
          </tr></thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}
