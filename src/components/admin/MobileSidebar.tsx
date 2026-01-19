"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, PlusCircle } from "lucide-react";
import Link from "next/link";

function MobileSidebar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu color="white" size={28} />
        </SheetTrigger>
        <SheetContent side="left" className="w-56 z-200">
          <SheetHeader className="-mt-2">
            <Link
              href="/"
              className="flex flex-wrap gap-1 text-lg sm:text-xl md:text-2xl font-bold"
            >
              <span className="text-[#F87171]">Backup</span>
              <span className="text-[#DAA520]">Web3</span>
              <span className="text-[#4169E1]">Vault</span>
            </Link>
          </SheetHeader>
          <nav className="flex flex-col gap-4 pl-5">
            <Link href="/admin" className="font-medium">
              <SheetClose className="w-full flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200">
                <Home size={18} /> Dashboard
              </SheetClose>
            </Link>
            <Link href="/admin/add-balance" className="font-medium">
              <SheetClose className="w-full flex items-center gap-2 font-medium hover:text-blue-600 transition duration-200">
                <PlusCircle size={18} /> Add Balance
              </SheetClose>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSidebar;