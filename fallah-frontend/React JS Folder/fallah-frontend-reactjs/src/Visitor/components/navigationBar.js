import {
  Box,
  AppBar,
  Button,
  useScrollTrigger,
  Slide,
  Typography,
  Toolbar,
} from "@mui/material";
import { Container } from "@mui/system";

import logo from "../assets/images/3.png";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const VisitorNavigationBar = (props) => {
  return (
    <HideOnScroll {...props}>
      <AppBar className="fixed w-full h-16 " position="fixed">
        <Box className="flex justify-between items-center h-fill px-4 sm:px-10 py-1 bg-light-green">
          <Box className="flex items-center">
            <img src={logo} alt="logo" className="w-28 -my-2.5" />
          </Box>
          <Box className="flex items-center gap-5">
            <Button
              variant="contained"
              color="creamWhite"
              size="small"
              style={{
                color: "var(--dark-green)",
                padding: "0.4rem 1rem",
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="darkGreen"
              size="small"
              style={{
                color: "var(--cream-white)",
                padding: "0.4rem 1rem",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </AppBar>
    </HideOnScroll>
  );
};

export default VisitorNavigationBar;
