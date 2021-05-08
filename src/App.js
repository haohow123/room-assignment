import Proptypes from "prop-types";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

import Room from "./Room";
import Summary from "./Summary";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
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
}));

function App() {
  const classes = useStyles();
  const [people, setPeople] = useState(0);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    console.log('mounted and callApi to get people and rooms')
    setPeople(3)
    setRooms([
      { min: 2, max: 2 },
      { min: 1, max: 1 },
    ])
  }, []);
  const handleDistribution = (rooms) => {
    //call api
    console.log("toBackendData", rooms);
  };
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
        <Room />
      </Box>
    </div>
  );
}

App.propTypes = {
  people: Proptypes.number,
  rooms: Proptypes.arrayOf(
    Proptypes.shape({ min: Proptypes.number, max: Proptypes.number })
  ),
  handleDistribution: Proptypes.func,
};

export default App;
