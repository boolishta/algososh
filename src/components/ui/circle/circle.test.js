import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

it('Circle без буквы рендерится без ошибок', () => {
  const tree = renderer.create(<Circle />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с буквами рендерится без ошибок', () => {
  const tree = renderer.create(<Circle letter="abc" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с head рендерится без ошибок', () => {
  const tree = renderer.create(<Circle head="head" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с реакт элементов в head рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle head={<Circle letter="c" />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с tail рендерится без ошибок', () => {
  const tree = renderer.create(<Circle tail="tail" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с реакт элементов в tail рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle tail={<Circle letter="c" />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с index рендерится без ошибок', () => {
  const tree = renderer.create(<Circle index="1" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle с пропом isSmall рендерится без ошибок', () => {
  const tree = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle в состоянии default рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle в состоянии changing рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Circle в состоянии modified рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
