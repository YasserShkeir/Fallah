import { Typography, TextField, Box } from "@mui/material";

const AdminUserDataSection = (props) => {
  return (
    <Box className="flex gap-2 items-center justify-between xl:w-full">
      <Typography>{props.name}:</Typography>
      <TextField
        label={props.name + " " + props.labelName}
        variant="outlined"
        size="small"
        color="creamWhite"
        className="w-36 xl:w-40 "
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        value={props.value}
        onChange={(e) => {
          props.fun(e.target.value);
        }}
      />
    </Box>
  );
};

export default AdminUserDataSection;
