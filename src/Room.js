import { Fragment, useCallback, useState } from "react";
import Proptypes from "prop-types";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import SlideTransition from "./Transitions/SlideTransition";
import NumberInput from "./NumberInput";

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
}));

function Room(props) {
  const classes = useStyles();
  const { room } = props;
  const [peopleList] = useState([
    { key: "adult", text: "大人", hint: "年齡20+" },
    { key: "child", name: "小孩", hint: "年齡0+" },
  ]);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [slideDirection, setSlideDirection] = useState("opposite");
  const isAdult = useCallback((key) => key === "adult", []);
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
  const onChange = (key, amount) => {
    if (isAdult(key)) {
      setAdult((prevAdult) => {
        checkAmountChange(prevAdult, amount);
        return amount;
      });
    } else {
      setChild((prevChild) => {
        checkAmountChange(prevChild, amount);
        return amount;
      });
    }
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
            max={room.max - (isAdult(key) ? child : adult)}
            step={1}
            onClick={(amount) => onChange(key, amount)}
            onBlur={(amount) => onChange(key, amount)}
            onChange={(amount) => onChange(key, amount)}
          />
        </Box>
      ))}
    </Fragment>
  );
}

Room.propTypes = {
  room: Proptypes.shape({ min: Proptypes.number, max: Proptypes.number }),
};

export default Room;
