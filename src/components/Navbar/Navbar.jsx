import React from "react";
import {
  Flex,
  Image,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfilePageNavbar from "./ProfilePageNavbar";
import AuthNavBar from "./AuthNavBar";
import { useAuth } from "../../hooks/useAuth.jsx";
import miniLogoHeader from "../../assets/images/logo-devlinks-small.svg";
import devLinksLogo from "../../assets/images/logo-devlinks-large.svg";
import linkHeader from "../../assets/images/icon-links-header.svg";
import profileHeader from "../../assets/images/icon-profile-details-header.svg";
import previewHeader from "../../assets/images/icon-preview-header.svg";
import CustomButton from "../../components/Button/CustomButton";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  if (location.pathname === "/profile") return <ProfilePageNavbar />;
  if (location.pathname === "/login" || location.pathname === "/create-account")
    return <AuthNavBar />;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const NavLinkItem = ({ to, icon, label }) => (
    <NavLink to={to}>
      <Flex align="center" className="hover-purple" gap="2">
        <Image src={icon} alt={`${label} Icon`} />
        {isLargerThan768 && <Text>{label}</Text>}
      </Flex>
    </NavLink>
  );

  return (
    <Box
      className="navbar-box"
      bg="white"
      p={{ base: 3, md: 5 }}
      mb={{ base: "20px", md: "35px" }}
    >
      <Flex align="center" justify="space-between">
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <Image
              src={isLargerThan768 ? devLinksLogo : miniLogoHeader}
              alt="DevLinks Logo"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
        <Flex gap={{ base: 10, md: 20 }} align="center">
          <NavLinkItem to="/links" icon={linkHeader} label="Links" />
          <NavLinkItem
            to="/profile-details"
            icon={profileHeader}
            label="Profile Details"
          />
        </Flex>
        <NavLink to="/profile" className="profileIcon">
          {isLargerThan768 ? (
            <CustomButton className="primaryButton preview-text">
              Preview
            </CustomButton>
          ) : (
            <Image src={previewHeader} alt="Preview Icon" />
          )}
        </NavLink>
      </Flex>
    </Box>
  );
}

export default Navbar;
