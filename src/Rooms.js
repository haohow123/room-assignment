import { Fragment } from "react";
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
  return (
    <Fragment>
      {rooms.map((room, index) => (
        <Fragment key={room.roomId}>
          {!!index && <Divider className={classes.divider} />}
          <Room room={room} />
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
};
export default Rooms;
