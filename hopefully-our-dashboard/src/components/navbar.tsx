import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Image from "next/image";
import homeIcon from "@/assets/icons/home.svg";

export default function Navbar() {
  return (
    <nav className="flex h-screen w-1/6 flex-col bg-black">
      <h1 className="mx-auto p-4 text-white">Namma Metro</h1>
      <Separator orientation="horizontal" className="" />
      <div className="flex flex-col space-y-4 p-4">
        <Button variant={"ghost"} asChild>
          <Link className="text-white" href="/dashboard">
            Dashboard
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link className="text-white" href="#">
            Table
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link className="text-white" href="#">
            Billing
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link className="text-white" href="#">
            RTL
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link className="text-white" href="#">
            Profile
          </Link>
        </Button>
      </div>
    </nav>
  );
}
