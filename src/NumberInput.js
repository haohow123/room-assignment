import { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import Proptypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  hint: {
    position: "absolute",
    lineHeight: "1rem",
    margin: "0",
  },
  error: {
    borderColor: theme.palette.error.main,
  },
  button: {
    minWidth: "40px",
    width: "40px",
    margin: `0 ${theme.spacing(1)}px`,
  },
  buttonRoot: {
    "&$buttonDisabled": {
      cursor: "not-allowed",
      pointerEvents: "unset",
      border: "1px solid rgba(30, 159, 210, 0.5)",
      color: "#1E9FD2",
      opacity: 0.48,
    },
  },
  buttonDisabled: {},
}));
function helperTextReducer(state, action) {
  switch (action.type) {
    case "overMax":
      return "超過最大值";
    case "belowMin":
      return "低於最小值";
    default:
      return "";
  }
}
function NumberInput(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [helperText, helperTextDispatch] = useReducer(helperTextReducer, "");

  //one of comopnent error or PropsError turn to Error state
  useEffect(() => {
    setError(error || props.error);
  }, [error, props.error]);

  const onChange = ($event) => {
    let value = Number($event.target.value);
    //if isNaN or negative number set value to 0
    if (isNaN(value) || value < 0) {
      value = 0;
    }

    props.onChange(value);
  };
  useEffect(() => {
    if (props.value > props.max) {
      helperTextDispatch({ type: "overMax" });
      setError(true);
    } else if (props.value < 0) {
      helperTextDispatch({ type: "belowMin" });
      setError(true);
    } else {
      helperTextDispatch({ type: "" });
      setError(false);
    }
  }, [props, setError]);
  return (
    <Box>
      <Box display={"flex"}>
        <Button
          name="minus-value"
          className={clsx(classes.button)}
          variant="outlined"
          color="primary"
          onClick={() => props.onClick(props.value - props.step)}
          classes={{
            root: classes.buttonRoot,
            disabled: classes.buttonDisabled,
          }}
          disabled={props.value === 0}
        >
          <Remove />
        </Button>
        {/*number will appear 01,02,03 problem*/}
        <input
          type="text"
          aria-label="number-value"
          className={clsx(classes.input, error && classes.error)}
          min={0}
          max={props.max}
          step={props.step}
          onChange={onChange}
          value={props.value}
        />
        <Button
          name="add-number"
          className={clsx(classes.button)}
          aria-label="add-value"
          variant="outlined"
          color="primary"
          onClick={() => props.onClick(props.value + props.step)}
          disabled={props.value + props.step > props.max}
          classes={{
            root: classes.buttonRoot,
            disabled: classes.buttonDisabled,
          }}
        >
          <Add />
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        {error && (
          <FormHelperText error className={clsx(classes.hint)}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}
NumberInput.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]).isRequired,
  min: Proptypes.number.isRequired,
  max: Proptypes.number.isRequired,
  step: Proptypes.number.isRequired,
  onClick: Proptypes.func.isRequired,
  onBlur: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  error: Proptypes.bool,
};
export default NumberInput;
