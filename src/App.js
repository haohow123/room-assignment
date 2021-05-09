import { useCallback, useReducer, useState } from "react";
import PropTypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";

import Rooms from "./Rooms";
import Summary from "./Summary";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: "#e5e5e5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
  },
  helperText: {
    position: "absolute",
    marginTop: theme.spacing(-2),
  },
}));

function helperTextReducer(state, action) {
  switch (action.type) {
    case "overMax":
      return `超過訂房人數`;
    case "belowMin":
      return `少於訂房人數`;
    default:
      return "";
  }
}

function App({ rooms, people }) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [helperText, helperTextDispatch] = useReducer(helperTextReducer, "");
  const [isDirty, setIsDirty] = useState(false);
  const validateForm = useCallback(
    (roomsData) => {
      let result = false;

      //check room's people amount fit all people
      const roomsPeopleAmount = roomsData.reduce(
        (acc, { adult, child }) => acc + adult + child,
        0
      );
      if (roomsPeopleAmount === people) {
        result = true;
      }

      //if result is true, check min/max validate
      if (result) {
        roomsData.forEach(({ adult, child }, index) => {
          const amount = adult + child;
          if (rooms[index].max > amount || rooms[index].min < amount) {
            result = true;
          } else {
            return (result = false);
          }
        });
      }
      return result;
    },
    [rooms, people]
  );

  const handleDistribution = useCallback(
    (rooms) => {
      //setDirty
      if (!isDirty) {
        setIsDirty(true);
      }

      //call api
      if (validateForm(rooms)) {
        helperTextDispatch({ type: "" });
        console.log("toBackendData", JSON.stringify(rooms));
      } else {
        setError(true);
        const roomsPeopleAmount = rooms.reduce(
          (acc, { adult, child }) => acc + adult + child,
          0
        );
        //hint after isDirty
        if (isDirty) {
          if (roomsPeopleAmount > people) {
            helperTextDispatch({ type: "overMax" });
          } else {
            helperTextDispatch({ type: "belowMin" });
          }
        }
      }
    },
    [validateForm, setError, people, setIsDirty, isDirty]
  );
  return (
    <div className={classes.root}>
      <Box
        width={375}
        height={381}
        bgcolor={"white"}
        borderRadius={4}
        boxShadow={1}
        p={2}
      >
        <Summary people={people} roomsAmount={rooms.length} />
        {error && (
          <FormHelperText error className={clsx(classes.helperText)}>
            {helperText}
          </FormHelperText>
        )}
        <Rooms
          rooms={rooms}
          handleDistribution={handleDistribution}
          error={error}
        />
      </Box>
    </div>
  );
}

App.prototype = {
  people: PropTypes.number.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.string.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default App;
