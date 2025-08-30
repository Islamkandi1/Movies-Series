import React, { useContext } from "react";
import Badge from "@mui/material/Badge";
import { CiHeart } from "react-icons/ci";
import { ChangeIconContext } from "../../context/ChangeIcon";
const MyBadge = () => {
    const  {icon} = useContext(ChangeIconContext)

    
  return (
    <>
      <Badge
        badgeContent={icon.length}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "var(--color-main)",
            color: "#fff",
          },
        }}
      >
        <CiHeart />
      </Badge>
    </>
  );
};

export default MyBadge;
