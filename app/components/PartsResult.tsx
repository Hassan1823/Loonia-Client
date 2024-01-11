import React from "react";
import Loader from "./Loader";

type Props = {
  data: any;
  loading: boolean;
};

const PartsResult: React.FC<Props> = ({ data, loading }) => {
  return (
    <div className="w-full min-h-screen h-auto">
      {loading ? (
        <>
          <Loader />
        </>
      ) : data.length === 0 || data === "" ? (
        <>
          <h1 className="w-full min-h-screen h-auto text-center mt-24">
            No Related Data Found
          </h1>
        </>
      ) : (
        <>Data Found</>
      )}
    </div>
  );
};

export default PartsResult;
