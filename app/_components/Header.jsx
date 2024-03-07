"use client";

import Image from "next/image";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function Header() {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={180} height={100} />
        </Link>

        <div className="md:flex items-center gap-6 hidden">
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            <Link href="/">Home</Link>
          </h2>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            <Link href="/search/Cleaning">Services</Link>
          </h2>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            About Us
          </h2>
        </div>
      </div>
      <div>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user?.image}
                width={40}
                height={40}
                alt="user"
                className="rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/mybooking">My Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope", { callbackUrl: "/" })}>
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
