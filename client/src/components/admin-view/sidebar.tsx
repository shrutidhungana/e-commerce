import React from "react";
import {
  ChartNoAxesCombined,
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

import { SidebarMenuItem } from "@/types";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useRouter } from "next/router";

const adminSidebarMenuItems: SidebarMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

type MenuItemsProps = {
  setOpen?: (open: boolean) => void;
};

const MenuItems: React.FC<MenuItemsProps> = ({setOpen}) => {
  const router = useRouter();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems?.map((menuItem) => (
        <div
          key={menuItem?.id}
          onClick={() => {
              router.push(menuItem?.path);
              setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem?.icon}
          <span>{menuItem?.label}</span>
        </div>
      ))}
    </nav>
  );
};

type AdminSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
  const router = useRouter();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => router.push("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};
export default AdminSidebar;
