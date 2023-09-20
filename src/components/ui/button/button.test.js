import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer.create(<Button text="Button" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(
      <Button
        text="Button"
        disabled
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кнопка с загрузкой рендерится без ошибок', () => {
  const tree = renderer
    .create(
      <Button
        text="Button"
        isLoader
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает правильный alert', () => {
  window.alert = jest.fn();
  render(
    <Button
      text="Button"
      onClick={() => alert('Button clicked')}
    />
  );
  const button = screen.getByText('Button');
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledWith('Button clicked');
});
