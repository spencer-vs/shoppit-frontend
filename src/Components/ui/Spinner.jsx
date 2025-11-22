import { ClipLoader } from "react-spinners";
import { useState, CSSProperties } from "react";



const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "purple",
};



const Spinner = ({cartloading}) => {
  return (
    <ClipLoader
        loading={cartloading}
        cssOverride={override}
        size={450}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

  )
}

export default Spinner











