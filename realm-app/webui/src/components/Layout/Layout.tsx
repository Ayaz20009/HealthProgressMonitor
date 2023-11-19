import { Container } from 'react-bootstrap'
import Header from './Header/Header'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-vh-100">
      <Header />
      <Container fluid className="main-content bg-light">
        {children}
      </Container>
    </div>
  )
}

export default Layout