import { Fragment } from "react";
import clsx from "clsx";
import Proptypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "50px",
    border: "1px solid #BFBFBF",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "14px",
    MozAppearance: "textfield",
    "&::-webkit-inner-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  button: {
    minWidth: "40px",
    width: "40px",
    margin: `0 ${theme.spacing(1)}px`,
  },
}));
function NumberInput(props) {
  const classes = useStyles();
  const onChange = ($event) => props.onChange(Number($event.target.value));
  return (
    <Fragment>
      <Button
        className={clsx(classes.button)}
        variant="outlined"
        color="primary"
        onClick={() => props.onClick(props.value - 1)}
      >
        <Remove />
      </Button>
      <input
        type="number"
        className={clsx(classes.input)}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={onChange}
        value={props.value}
      />
      <Button
        className={clsx(classes.button)}
        variant="outlined"
        color="primary"
        onClick={() => props.onClick(props.value + 1)}
      >
        <Add />
      </Button>
    </Fragment>
  );
}
NumberInput.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.number.isRequired,
  min: Proptypes.number.isRequired,
  max: Proptypes.number.isRequired,
  step: Proptypes.number.isRequired,
  onClick: Proptypes.func.isRequired,
  onBlur: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
};
export default NumberInput;
