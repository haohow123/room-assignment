import { Fragment, useCallback, useEffect, useState } from "react";
import Proptypes from "prop-types";

import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Room from "./Room";

const useStyles = makeStyles((theme) => ({
  divider: { margin: `${theme.spacing(2)}px 0` },
}));
function Rooms(props) {
  const classes = useStyles();
  const { rooms, handleDistribution } = props;
  const [people, setPeople] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  //set init people
  useEffect(() => {
    setPeople(rooms.map(() => ({ adult: 0, child: 0 })));
  }, [rooms, setPeople]);

  //change rooms people
  const onChange = useCallback(
    (index, value) => {
      if (!isDirty) {
        setIsDirty(true);
      }
      let result = [].concat(...people);
      result[index] = value;
      setPeople(result);
    },
    [people, setPeople, isDirty, setIsDirty]
  );

  //handleDistribution
  useEffect(() => {
    //make sure init will not emit
    if (isDirty) {
      handleDistribution(people);
    }
  }, [people, handleDistribution, isDirty]);

  return (
    <Fragment>
      {rooms.map((room, index) => (
        <Fragment key={room.roomId}>
          {!!index && <Divider className={classes.divider} />}
          <Room
            room={room}
            onChange={(value) => onChange(index, value)}
            error={props.error}
          />
        </Fragment>
      ))}
    </Fragment>
  );
}

Rooms.propTypes = {
  rooms: Proptypes.arrayOf(
    Proptypes.shape({
      roomId: Proptypes.string,
      min: Proptypes.number,
      max: Proptypes.number,
    }).isRequired
  ),
  handleDistribution: Proptypes.func.isRequired,
  error: Proptypes.bool,
};
export default Rooms;
