import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:bg-secondary py-1.5 px-3  rounded-full gap-2`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/createIndex">Create</NavLink>
      </li>
      <li>
        <NavLink href="/indecies">Explore</NavLink>
      </li>
      <li>
        <NavLink href="/about">About</NavLink>
      </li>
    </>
  );

  const router = useRouter();

  const authenticate = useOkto();
  const [authToken, setAuthToken] = useState();
  const BASE_URL = "https://sandbox-api.okto.tech";
  const OKTO_CLIENT_API = process.env.OKTO_CLIENT_API;

  const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
      "x-api-key": OKTO_CLIENT_API,
      "Content-Type": "application/json",
    },
  });

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    if (authenticate) {
      authenticate.authenticate(idToken, async (authResponse: any, error: any) => {
        if (authResponse) {
          console.log("auth token received", authResponse);
          // router.push("/index");
        }
        if (error) {
          console.error("Authentication error:", error);
        }
      });
    }
  };

  return (
    <div className="sticky lg:static top-0 py-6 navbar min-h-0 flex-shrink-0 justify-between z-20 header-custom">
      <div className="navbar-start">
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-8 mr-6">
          <div className="flex flex-col">
            <span className="font-bold leading-tight text-2xl">XanFi</span>
          </div>
        </Link>
      </div>
      <div className="navbar-center w-auto">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <button
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </button>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>

        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      <div className="navbar-end flex-grow mr-8">
      <div>
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <> Authenticated </>
      )}
    </div>
      </div>
    </div>
  );
};
