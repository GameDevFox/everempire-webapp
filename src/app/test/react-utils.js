import ReactTestUtils from 'react-dom/lib/ReactTestUtils';

function renderToElement(jsx) {
  const doc = ReactTestUtils.renderIntoDocument(jsx);
  return ReactTestUtils.findAllInRenderedTree(doc, inst => {
    return ReactTestUtils.isDOMComponent(inst);
  })[0];
}

export { renderToElement };
