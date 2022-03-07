import { render } from "react-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from "./hello";

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('displays with && without name', () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe('Salut étranger !');

  act(() => {
    render(<Hello name="Jenny" />, container);
  })
  expect(container.textContent).toBe('Bonjour Jenny !');

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Bonjour Margaret !");
});
