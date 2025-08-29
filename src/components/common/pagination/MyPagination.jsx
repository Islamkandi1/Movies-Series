import React from "react";
import Pagination from "@mui/material/Pagination";
const MyPagination = ({ page, handlePage,totalPages }) => {
  return (
    <div className="flex justify-center mt-7 z-10">
      <Pagination
        onChange={handlePage}
        count={totalPages}
       variant="text"
        page={page}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: "white",
          },
          "& .Mui-selected": {
            backgroundColor: "red !important",
            color: "white",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#364153",
          },
        }}
      />
    </div>
  );
};

export default MyPagination;
