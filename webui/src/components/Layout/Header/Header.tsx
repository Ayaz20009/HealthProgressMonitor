import logo from "../../../assets/logo.png";
import Image from 'react-bootstrap/Image';
import '../Header/Header.css'

type HeaderProps = {
}

export default function Header(props: HeaderProps) {

  return (
    <header className="header px-4 border-bottom d-flex flex-lg-row flex-column align-items-center">
      <a href="/"><Image className="logo" src={logo}/></a>
    </header>
  )
}

