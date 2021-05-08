import Proptypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
  },
}));

function Summary(props) {
  const { people, roomsAmount } = props;
  const classes = useStyles();
  return (
    <Typography
      component="h4"
      variant="h4"
      align="left"
      className={classes.title}
    >
      住客人數：{people} 人 / {roomsAmount} 房
    </Typography>
  );
}

Summary.propTypes = {
  people: Proptypes.number.isRequired,
  roomsAmount: Proptypes.number.isRequired,
};
export default Summary;
