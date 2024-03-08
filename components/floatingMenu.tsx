"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const FloatingMenu = () => {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white rounded-xl px-4 py-2 shadow-md `">
        <p className="text-gray-800 text-xl"> 👨</p>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-black">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-white" />
        <DropdownMenuItem className="hover:bg-gray-800">
          <Link href="/profile"> Update Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-800">
          <button className="" onClick={signOut}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FloatingMenu;
