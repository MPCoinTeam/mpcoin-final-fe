import { ThemedText } from '../atoms/ThemedText';
import * as React from 'react';
import renderer from 'react-test-renderer';

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});
