import { render, screen, fireEvent } from "@testing-library/react";
import NumberInput from "./NumberInput";

test("input value by props", () => {
  //  function required when render
  const onChange = () => {};
  const input = render(
    <NumberInput
      name="number"
      value={0}
      min={0}
      max={4}
      step={1}
      onClick={onChange}
      onBlur={onChange}
      onChange={onChange}
    />
  );
  const inputElement = input.getByLabelText("number-value");
  expect(inputElement.value).toBe("0");
});

test("add button click", () => {
  const onChange = jest.fn();
  const input = render(
    <NumberInput
      name="number"
      value={0}
      min={0}
      max={4}
      step={1}
      onClick={onChange}
      onBlur={onChange}
      onChange={onChange}
    />
  );
  const buttonElement = input.getByLabelText("add-value");
  fireEvent.click(buttonElement);
  expect(onChange).toBeCalled();
});
