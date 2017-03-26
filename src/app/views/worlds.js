import React, {Component} from 'react';

export default class Worlds extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      worlds: [],
      user: null
    };

    this.onNameChange = e => {
      this.setState({name: e.target.value});
    };
    this.onCreateWorld = () => {
      this.setState({name: ''});
      const name = this.state.name;
      this.empireService.createWorld({name})
        .then(world => {
          const worlds = this.state.worlds;
          worlds.push(world);
          this.setState({world});
        });
    };
    this.onDestroyWorld = worldId => {
      return () => {
        this.empireService.destroyWorld(worldId)
          .then(() => {
            let worlds = this.state.worlds;
            worlds = worlds.filter(world => world.id !== worldId);
            this.setState({worlds});
          });
      };
    };
    this.belongsToUser = world => (this.state.user.id === world.user.id);
  }

  componentWillMount() {
    let user;
    this.empireService.getUser()
      .then(usr => {
        user = usr;
        return this.empireService.getWorlds();
      })
      .then(worlds => this.setState({user, worlds}));
  }

  render() {
    const tableRows = this.state.worlds.map(world => {
      let destroyButton = null;
      if(this.belongsToUser(world))
        destroyButton = (
          <button onClick={this.onDestroyWorld(world.id)}>
            Destroy
          </button>
        );

      return (
        <tr key={world.id}>
          <td>{world.id}</td>
          <td>{world.name}</td>
          <td>{world.user.email}</td>
          <td>{destroyButton}</td>
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
            <th>Action</th>
          </tr></thead>
          <tbody>{tableRows}</tbody>
        </table>

        <input value={this.state.name} onChange={this.onNameChange}/>
        <button onClick={this.onCreateWorld}>Create</button>
      </div>
    );
  }
}
