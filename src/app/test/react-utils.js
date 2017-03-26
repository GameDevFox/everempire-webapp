import ReactTestUtils from 'react-dom/lib/ReactTestUtils';

function renderToElement(jsx) {
  const doc = ReactTestUtils.renderIntoDocument(jsx);
  const element = ReactTestUtils.findAllInRenderedTree(doc, inst => {
    return ReactTestUtils.isDOMComponent(inst);
  })[0];
  return element;
}

export {renderToElement};
