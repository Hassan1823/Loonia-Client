"use client";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import avatarDefault from "../../../../public/dp.jpg";
import {
  ArrowBackIosIcon,
  ArrowForwardIosIcon,
  ExitToAppIcon,
  GroupsIcon,
  HomeOutlinedIcon,
  ReceiptOutlinedIcon,
} from "./Icons";
// import {useTheme} from 'next-theme'

interface Props {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<Props> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] ">{title}</Typography>
      <Link href={`${to}`} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  // const {theme, setTheme} = useTheme()

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#020617 !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#EAB308 !important",
        },
        "& .pro-menu-item.active": {
          color: "#EAB308 !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: "#fff",
        },
      }}
      className="bg-black"
      
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          // position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          // width: isCollapsed ? "0%" : "15%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "15px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="0px"
              >
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-[#ffffffc1]" />
                </IconButton>
                <Link href={`/admin`}>
                  <h5 className="text-[18px] uppercase text-[#EAB308] text-center">
                    Loonia Traders
                  </h5>
                </Link>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #EAB308",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-[#ffffffc1] capitalize"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>

                <Typography
                  variant="h6"
                  className="!text-[20px] text-[#ffffffc1] capitalize"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="User"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Orders"
              to="/admin/orders"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <div onClick={logoutHandler} className="">
              <Item
                title="Exit"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

// export default Item;
