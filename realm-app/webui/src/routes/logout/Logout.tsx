
import { SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginAsync, logoutAsync, selectAuthState } from '../../redux/auth/authSlice'
import {
  Button,
  Col, Container, Form, Row,
} from 'react-bootstrap'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Config } from '../../utils/config'
import { useOktaAuth } from '@okta/okta-react'
import { IAuthState } from '../../redux/auth/state'
import { useCookies } from 'react-cookie'
import { Body, H1, H2 } from '@leafygreen-ui/typography'
import { MongoDBLogoMark } from '@leafygreen-ui/logo'

interface Props {
  loading?: boolean
}

export const Logout = ({ loading }: Props) => {
  const appAuthState = useAppSelector<IAuthState>(selectAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies([Config.cookies.AUTH]);

  /**
   * When component is loaded, log out
   */
  useEffect(() => {
    dispatch(logoutAsync({ app: appAuthState?.realmApp, user: appAuthState?.user })).then((response: any) => {
      removeCookies(Config.cookies.AUTH)
      removeCookies(Config.cookies.AUTH_TYPE)
      navigate('/login')
    });
  }, []);

  /**
   * render Logout component
   */
  return (
    <div className="bg-mongodb align-items-center pt-5">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col className="bg-white border p-5 mx-auto">
                <H2 className="text-center"> <MongoDBLogoMark height={30} className='mx-2 mb-2' /> Logging out...</H2>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

