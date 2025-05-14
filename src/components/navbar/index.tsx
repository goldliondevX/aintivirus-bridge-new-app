import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import ThemeSwitch from "../theme-switch";
import Logo from "./logo";

export default function Navbar() {
  return (
    <HeroNavbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
