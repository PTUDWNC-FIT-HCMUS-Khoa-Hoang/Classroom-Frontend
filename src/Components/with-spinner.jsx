import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, isFetching, ...otherProps }) => {
    const isProcessing = isLoading || isFetching;
    return (
      <>
        {isProcessing && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              zIndex: "99",
              position: "absolute",
            }}
          >
            <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
          </div>
        )}
        <div style={{ opacity: isProcessing ? "0.3" : "1" }}>
          <WrappedComponent {...otherProps} />
        </div>
      </>
    );
  };
  return Spinner;
};

export default WithSpinner;
