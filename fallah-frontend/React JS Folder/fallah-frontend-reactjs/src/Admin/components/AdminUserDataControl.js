import { Box, Typography, Button } from "@mui/material";

import AdminUserDataSection from "./AdminUserDataSection";

import { deleteUser } from "../hooks/users";

const AdminUserDataControl = (props) => {
  return (
    <Box
      id={props.id}
      className="h-96 w-auto flex flex-col xl:flex-row gap-3 border-light-green border-4 "
    >
      <Box className="flex flex-row flex-wrap xl:flex-col items-center xl:items-start h-fit xl:h-full w-full xl:w-64 px-4 py-2 xl:py-3 gap-3 bg-light-green">
        <Typography variant="h6" className="text-cream-white font-bold w-full">
          | {props.name} Controller |
        </Typography>

        <Box className="grow flex flex-row-reverse xl:flex-col-reverse">
          <Button
            variant="contained"
            size="small"
            color="creamWhite"
            className="w-fit h-fit"
            onClick={() => {
              deleteUser(props.deleteValue);
              props.deleteValue = "";
            }}
          >
            <Typography className="text-dark-green font-bold">
              Confirm
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        id={props.id + "-dashboard"}
        className="h-full min-w-80 flex-grow"
      ></Box>
    </Box>
  );
};

export default AdminUserDataControl;
