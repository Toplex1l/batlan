import logo from '../assets/logo.png';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import { Outlet, Link } from "react-router-dom";
import { GrLogout } from 'react-icons/gr';
import { useSelector } from 'react-redux';

export default function Root() {
    const user = useSelector(state => state)

    return (
      <>
        <Navbar
            color="dark"
            dark
        >
            <NavbarBrand href="/logged">
                <div className='imgLogo'>
                    <img 
                        alt="logo"
                        src={logo}
                        style={{
                        height: 60,
                        width: 60
                        }}
                    />
                </div>
            </NavbarBrand>
            <Nav
                className="me-auto navBar"
                vertical="0"
                navbar
            >
                <NavItem className='navItem'>
                    <NavLink>
                        <Link to="/logged/games">Jeux</Link>
                    </NavLink>
                </NavItem>
                <NavItem className='navItem'>
                    <NavLink to="/logged">Classement</NavLink>
                </NavItem>
                <NavItem className='navItem'>
                    <NavLink>
                        <Link to="/logged/groups">Poules</Link>
                    </NavLink>
                </NavItem>
                <NavItem className='navItem'>
                    <NavLink>
                        <Link to="/logged/bracket">Arbre de tournoi</Link>
                    </NavLink>
                </NavItem>
                {user.isAdmin ?
                    <NavItem className='navItem'>
                        <NavLink>
                            <Link to="/logged/tirage">Tirage Equipe</Link>
                        </NavLink>
                    </NavItem>
                 : null}
                <NavItem className='navItem'>
                    <UncontrolledDropdown >
                        <DropdownToggle nav caret>
                            Profil
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Editer profil</DropdownItem>
                            <DropdownItem>On verra</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </NavItem>
            </Nav>
            <NavbarBrand to="/">
                <GrLogout/>
            </NavbarBrand>
        </Navbar>

        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }