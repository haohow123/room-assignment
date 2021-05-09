import {
  Fragment,
  useCallback,
  useReducer,
  useState,
  useMemo,
  useEffect,
} from "react";
import Proptypes from "prop-types";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import SlideTransition from "./Transitions/SlideTransition";
import NumberInput from "./NumberInput";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  amount: {
    marginBottom: theme.spacing(2),
  },
  subAmount: {
    flexGrow: 1,
  },
  hint: {
    color: "#8C8C8C",
  },
  helperText: {
    position: "absolute",
    marginTop: `-${theme.spacing(0.5)}px`,
  },
}));

function helperTextReducer(state, action) {
  switch (action.type) {
    case "overMax":
      return `房間至多${action.max}人`;
    case "belowMin":
      return `房間至少${action.min}人`;
    default:
      return "";
  }
}
function Room(props) {
  const classes = useStyles();
  const { room, onChange } = props;
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [slideDirection, setSlideDirection] = useState("opposite");
  const [error, setError] = useState(false);
  const [helperText, helperTextDispatch] = useReducer(helperTextReducer, "");
  const [isDirty, setIsDirty] = useState(false);
  const isAdult = useCallback((key) => key === "adult", []);

  const peopleList = useMemo(
    () => [
      { key: "adult", text: "大人", hint: "年齡20+" },
      { key: "child", text: "小孩", hint: "年齡0+" },
    ],
    []
  );

  useEffect(() => {
    if (props.error) {
      setError(true);
      setIsDirty(true);
    }
  }, [props.error, setError, setIsDirty]);

  useEffect(() => {
    if (isDirty) {
      const amount = adult + child;
      if (amount > room.max) {
        helperTextDispatch({ type: "overMax", max: room.max });
        setError(true);
      } else if (amount < room.min) {
        helperTextDispatch({ type: "belowMin", min: room.min });
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [helperTextDispatch, adult, child, isDirty, setError, room]);

  //set slideDirection
  const checkAmountChange = useCallback(
    (prevAmount, curAmount) => {
      if (prevAmount > curAmount) {
        setSlideDirection("reverse");
      } else {
        setSlideDirection("opposite");
      }
    },
    [setSlideDirection]
  );

  const onAmountChange = (key, amount) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    const changedAmount = Object.assign({}, { adult, child });
    if (isAdult(key)) {
      setAdult((prevAdult) => {
        checkAmountChange(prevAdult, amount);
        return amount;
      });
      changedAmount.adult = amount;
    } else {
      setChild((prevChild) => {
        checkAmountChange(prevChild, amount);
        return amount;
      });
      changedAmount.child = amount;
    }
    onChange(changedAmount);
  };

  return (
    <Fragment>
      <Typography
        component={"div"}
        variant={"body1"}
        className={clsx(classes.amount)}
        align={"left"}
      >
        <Box display={"flex"}>
          <span>房間：</span>
          <SlideTransition
            transKey={adult + child}
            slideDirection={slideDirection}
          >
            <Box textAlign={"center"}>{adult + child}</Box>
          </SlideTransition>
          <Box marginLeft={0.25}>人</Box>
        </Box>
        {error && (
          <FormHelperText error className={clsx(classes.helperText)}>
            {helperText}
          </FormHelperText>
        )}
      </Typography>
      {peopleList.map(({ key, text, hint }) => (
        <Box component={"div"} display={"flex"} marginBottom={2} key={key}>
          <Typography
            component={"div"}
            align={"left"}
            variant={"body2"}
            className={clsx(classes.subAmount)}
          >
            <Box>{text}</Box>
            <Box fontWeight={400} className={clsx(classes.hint)}>
              {hint}
            </Box>
          </Typography>
          <NumberInput
            name={`${room.roomId}-${key}`}
            value={isAdult(key) ? adult : child}
            min={room.min}
            max={room.max}
            step={1}
            onClick={(amount) => onAmountChange(key, amount)}
            onBlur={(amount) => onAmountChange(key, amount)}
            onChange={(amount) => onAmountChange(key, amount)}
            error={error}
          />
        </Box>
      ))}
    </Fragment>
  );
}

Room.propTypes = {
  room: Proptypes.shape({
    min: Proptypes.number.isRequired,
    max: Proptypes.number.isRequired,
  }).isRequired,
  onChange: Proptypes.func,
};

export default Room;
