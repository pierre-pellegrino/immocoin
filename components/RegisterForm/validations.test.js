import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

it('renders the menu when no-one is connected', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<RegisterForm />);

  const emailInput = getByPlaceholderText("Email");
  const pwdInput = getByPlaceholderText("Mot de passe");
  const pwdConfirmInput = getByPlaceholderText("Confirmation du mot de passe");
  const submit = getByDisplayValue("M'inscrire");

  expect(submit).toHaveAttribute("disabled");

  emailInput.setAttribute("value", "test@poualala.or");
  pwdInput.setAttribute("value", "azerty");
  pwdConfirmInput.setAttribute("value", "azerty");
});
