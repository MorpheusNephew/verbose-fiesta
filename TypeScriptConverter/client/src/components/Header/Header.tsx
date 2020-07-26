import React from "react";
import { AppBar, Typography } from "@material-ui/core";

const Header = () => (
    <AppBar position="static">
        <Typography variant="h6" align="center">
            Office File Converter
        </Typography>
    </AppBar>
);

export { Header };
