"use client";

import { logout } from "@/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { JSX } from "react";
import { usePathname } from "next/navigation";

const menuConfig: Record<
  string,
  { label: string; path: string; icon: JSX.Element }[]
> = {
  super_admin: [
    { label: "Users", path: "/dashboard/users", icon: <GroupIcon /> },
    { label: "Orders", path: "/dashboard/orders", icon: <ShoppingCartIcon /> },
    {
      label: "Accounts",
      path: "/dashboard/accounts",
      icon: <LegendToggleIcon />,
    },
    {
      label: "Reports",
      path: "/dashboard/reports",
      icon: <AssessmentIcon />,
    },
  ],
  accountant: [
    {
      label: "Accounts",
      path: "/dashboard/accounts",
      icon: <LegendToggleIcon />,
    },
    {
      label: "Reports",
      path: "/dashboard/reports",
      icon: <AssessmentIcon />,
    },
  ],
  support: [
    { label: "Orders", path: "/dashboard/orders", icon: <ShoppingCartIcon /> },
  ],
};
export default function Sidebar() {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  if (!role) return null;
  const menuItems = menuConfig[role] || [];

  return (
    <aside className="w-72 h-screen p-3 bg-gray-100">
      <div className="bg-white h-full rounded-xl p-4">
        <Image
          src="/images/nexmin2.avif"
          alt="Nexmin Logo"
          width={"150"}
          height={"80"}
        />
        <div className="mt-5">
          <small className="px-4 text-gray-800 font-medium">MENU</small>
        </div>
        <nav className="flex flex-col gap-2 mt-1">
          {menuItems.map((item) => {
            const isActive = pathName === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 font-light flex gap-3 rounded-lg mb-1 transition
                ${
                  isActive
                    ? "bg-[#a893e745] text-[#5c3cbb] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
                `}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-5">
          <small className="px-4 text-gray-800 font-medium">GENERAL</small>
        </div>
        <div className="mt-2 px-4 ">
          <button
            className="py-2 font-light text-gray-800 flex gap-3 rounded-lg mb-1 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <SettingsIcon /> Settings
          </button>
          <button
            className="py-2 font-light text-gray-800 flex gap-3 rounded-lg mb-1 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <LogoutIcon /> Logout
          </button>
        </div>
        <div className="absolute bottom-8 ">
          <div className="flex flex-col">
            <span>Welcome!</span>
            <span className="font-medium capitalize">{role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
