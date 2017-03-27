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
    this.onDestroyClick = worldId => {
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

    this.worldColumns = [
      'id',
      'name',
      ['User', 'user.email'],
      ['Action', world => {
        return this.belongsToUser(world) ?
          <button onClick={this.onDestroyClick(world.id)}>
            Destroy
          </button> : null;
      }]
    ];
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
    const {TableList} = this;

    return (
      <div className="worlds">
        <h2>World List</h2>

        <TableList rows={this.state.worlds} cols={this.worldColumns}/>

        <input value={this.state.name} onChange={this.onNameChange}/>
        <button onClick={this.onCreateWorld}>Create</button>
      </div>
    );
  }
}
