"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Navbar.scss";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Kezdőlap" },
    { href: "/barbers", label: "Borbélyok" },
    { href: "/bookings", label: "Foglalásaim" },
  ];

  return (
    <header className='header'>
      <Link href='/' className='header__logo'>
        <Scissors className='header__logo-icon' size={22} />
        <span>BookABarber</span>
      </Link>

      <nav className='navbar'>
        <div className='navbar__links'>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${
                pathname === link.href ? "navbar__link--active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className='navbar__cta'>
          <Link href='/bookings'>
            <Button variant='default'>Foglalás</Button>
          </Link>
        </div>

        <button className='navbar__menu-button'>
          <Scissors size={22} />
        </button>
      </nav>
    </header>
  );
}
