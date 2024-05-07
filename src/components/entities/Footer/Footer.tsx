import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles.ts";

function Footer() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box
          mt={5}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
          </Typography>
          <a href="tel:+79315828252">Support 8(931)582-82-52</a>
        </Box>
      </Container>
    </>
  );
}
export default Footer;
