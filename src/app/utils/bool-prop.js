export default function addBooleanProp(obj, prop, value, trueFn, falseFn) { // eslint-disable-line max-params
  let bool = value;
  Object.defineProperty(obj, prop, {
    set: value => {
      bool = value;

      if(falseFn)
        bool ? trueFn.apply(obj) : falseFn.apply(obj); // eslint-disable-line no-unused-expressions
      else
        trueFn.call(obj, bool);
    },
    get: () => bool
  });

  return obj;
}
