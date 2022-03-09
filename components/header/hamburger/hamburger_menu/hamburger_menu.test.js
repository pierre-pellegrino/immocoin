import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HamburgerMenu from ".";

it('renders the menu when no-one is connected', () => {
  const { getByText } = render(<HamburgerMenu />);

  expect(getByText("Me connecter")).toBeInTheDocument();
  expect(getByText("M'inscrire")).toBeInTheDocument();
  expect(() => getByText("Mon Profil")).toThrow();
});

it('renders the menu when someone is connected', () => {
  const { getByText } = render(<HamburgerMenu connected={true} />);

  expect(getByText("Mon Profil")).toBeInTheDocument();
  expect(getByText("Créer une annonce")).toBeInTheDocument();
  expect(getByText("Me déconnecter")).toBeInTheDocument();
  expect(() => getByText("Me connecter")).toThrow();
});
