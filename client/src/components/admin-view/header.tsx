import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";

type AdminHeaderProps = {
  setOpen: (open: boolean) => void;
};

const AdminHeader: React.FC<AdminHeaderProps> = ({setOpen}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
  
  
    const handleLogout = () => {
      // dispatch(logoutUser());
        dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        router.push("/auth/login");
    };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};
export default AdminHeader;
