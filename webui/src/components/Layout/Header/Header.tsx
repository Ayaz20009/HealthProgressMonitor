import logo from "../../../assets/logo.png";
import Image from "react-bootstrap/Image";
import "../Header/Header.css";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {};

export default function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  // Function to update the selected tab index
  const handleSetSelected = (index) => {
    console.log(index);

    setSelected(index);
    if (index === 0) {
      navigate("/");
      setSelected(0);
    } else if (index === 1) {
      navigate("/patient");
      setSelected(1);
    } else if (index === 2) {
      navigate("/cases");
      setSelected(2);
    } else if (index === 3) {
      navigate("/upload");
      setSelected(3);
    }
  };

  return (
    <header className="header px-4 border-bottom d-flex flex-column align-items-left">
      {/* Logo */}
      <a href="/" className="mb-2 mt-3">
        {" "}
        {/* mb-3 adds margin-bottom for spacing */}
        <Image className="logo" src={logo} />
      </a>

      {/* Tabs */}
      <Tabs
        setSelected={handleSetSelected}
        selected={selected}
        aria-labelledby="tabs-label"
      >
        <Tab name="Dashboard"></Tab>
        <Tab name="Patient"></Tab>
        <Tab name="Cases"></Tab>
        <Tab name="Upload"></Tab>
      </Tabs>
    </header>
  );
}
