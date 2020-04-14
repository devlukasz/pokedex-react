import React, { Component } from "react";
import HomeLayout from "../HomeLayout";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export default class Dashboard extends Component {
  render() {
    return (
      <Container maxWidth={"xl"}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid sm={12} xl={9} lg={9} md={12}>
            <HomeLayout />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
