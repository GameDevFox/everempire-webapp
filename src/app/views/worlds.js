import React, { Component } from 'react';

export default class Worlds extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      worlds: []
    };

    this.onNameChange = e => {
      this.setState({ name: e.target.value });
    };

    this.onCreateWorld = () => {
      this.setState({ name: '' });
      const name = this.state.name;
      this.empireService.createWorld({ name })
        .then(world => {
          const worlds = this.state.worlds;
          worlds.push(world);
          this.setState({ worlds });
        });
    };

    this.onDestroyClick = worldId => {
      return () => {
        this.empireService.destroyWorld(worldId)
          .then(() => {
            let worlds = this.state.worlds;
            worlds = worlds.filter(world => world.id !== worldId);
            this.setState({ worlds });
          });
      };
    };

    this.belongsToUser = world => (this.state.meId === world.user_id);

    this.worldColumns = [
      'id',
      'name',
      ['User', 'user.name'],
      ['Action', world => {
        const destroyButton = this.belongsToUser(world) ?
          (<button className="btn btn-default btn-xs" onClick={this.onDestroyClick(world.id)}>
            Destroy
          </button>) : null;

        return (<div>
          <button className="btn btn-default btn-xs">Connect</button>
          {destroyButton}
        </div>);
      }]
    ];
  }

  componentDidMount() {
    this.empireService.getMe().then(me => this.setState({ meId: me.id }));
    this.empireService.getWorlds().then(worlds => this.setState({ worlds }));
  }

  render() {
    const { TableList } = this;

    return (
      <div className="worlds">
        <h2>World List</h2>

        <input value={this.state.name} onChange={this.onNameChange}/>
        <button className="btn btn-default btn-xs" onClick={this.onCreateWorld}>Create</button>

        <TableList rows={this.state.worlds} cols={this.worldColumns}/>
      </div>
    );
  }
}
