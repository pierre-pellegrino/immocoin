import { render } from "react-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PropertyCard from "./PropertyCard";

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

it('should display with or without title', () => {
  act(() => {
    render(<PropertyCard title={"Appartement Parisien"}/>, container);
  });
  expect(container.querySelector('h2').textContent).toBe('Appartement Parisien');

  act(() => {
    render(<PropertyCard />, container);
  });
  expect(container.querySelector('h2').textContent).toBe("Nom de l'annonce");
});

it('should display with or without description', () => {
  // <= 140 characters
  act(() => {
    render(<PropertyCard description={"Lorem ipsum dolor sit amet, consectetur"}/>, container);
  });
  expect(container.querySelector('h2 + p + p').textContent).toBe('Lorem ipsum dolor sit amet, consectetur');

  // > 140 characters
  act(() => {
    render(<PropertyCard description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut quam iaculis sem bibendum mollis nec ut libero. In hac habitasse platea dictumst. Morbi semper sapien ut efficitur luctus."}/>, container);
  });
  expect(container.querySelector('h2 + p + p').textContent).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut quam iaculis sem bibendum mollis nec ut libero. In hac habitasse platea d...');

  // No description
  act(() => {
    render(<PropertyCard />, container);
  });
  expect(container.querySelector('h2 + p + p').textContent).toBe('Description not available.');
});


it('should display price', () => {
  act(() => {
    render(<PropertyCard price={"150000"}/>, container);
  });
  expect(container.querySelector('h2 + p').textContent).toBe('150000€');

  act(() => {
    render(<PropertyCard />, container);
  });
  expect(container.querySelector('h2 + p').textContent).toBe('N/C€');
});
