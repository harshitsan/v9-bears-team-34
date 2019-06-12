import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { exampleAction } from "../actions/actions";

function Home({ exampleAction, placeholder }) {
  useEffect(
    function() {
      exampleAction();
    },
    [exampleAction]
  );
  return (
    <div id="homepage">
      <h1>{placeholder.placeholder}</h1>
    </div>
  );
}

Home.propTypes = {
  exampleAction: PropTypes.func.isRequired,
  placeholder: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    placeholder: state.placeholder
  }
}

export default connect(
  mapStateToProps,
  { exampleAction }
)(Home);
