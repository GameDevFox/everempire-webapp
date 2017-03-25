import _ from 'lodash';

export default function(clazz, classBindings) {
  return class extends clazz {
    constructor(...args) {
      super(...args);

      _.each(classBindings, (value, key) => {
        this[key] = value;
      });

      const props = args[0];
      _.each(props, (value, key) => {
        this[key] = value;
      });
    }
  };
}
