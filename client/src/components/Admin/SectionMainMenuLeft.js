import React from "react";

import { makeStyles, Button, Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  buttonBlack: {
    color: "white",
    backgroundColor: "black",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));
function SectionMainMenuLeft(props) {
  const classes = useStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Danh Mục</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Tất Cả Danh Mục
            </Button>
            <Button
              variant="contained"
              fullWidth
              className={classes.buttonBlack}
            >
              Thêm Mới Danh Mục
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sản Phẩm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Tất Cả Sản Phẩm
            </Button>
            <Button
              variant="contained"
              fullWidth
              className={classes.buttonBlack}
            >
              Thêm Mới Sản Phẩm
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Đơn Hàng</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Bảng điều khiển
            </Button>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Đơn Hàng
            </Button>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Báo Cáo
            </Button>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Khách Hàng
            </Button>
            <Button
              variant="contained"
              className={classes.buttonBlack}
              fullWidth
            >
              Báo Cáo
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>User Name</Typography>
        </AccordionSummary>
      </Accordion>
    </>
  );
}

export default SectionMainMenuLeft;
