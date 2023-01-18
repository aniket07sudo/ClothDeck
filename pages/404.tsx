import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import styled from 'styled-components';
import DarkButton from '../src/components/Buttons/Darked';
import { devicemaxWidth } from '../src/constants/breakpoints';
import { useUserDispatch } from '../src/store/user/UserProvider'

export default function FourOhFour() {

  const dispatch = useUserDispatch();

  useEffect(() => {
    dispatch({type:"LOADING_END"})
  },[])

  const Router = useRouter();
  return(
    <Container>
      <div className='dummy_nav'>
        <Link href={'/'}>
          ClothDeck.
        </Link>
      </div>
      <h2>404</h2>
      <h3>Oops ! Page Not Found</h3>
      <div className='back' onClick={() => Router.back()}>
        Go Back
      </div>
    </Container>
  )
}

const Container = styled.div`
  height:100vh;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  gap:3rem;
  .back {
    font-size:2rem;
    background-color:${({theme}) => theme.text};
    color:${({theme}) => theme.body};
    padding:1rem 2rem;
    cursor:pointer;
  }

  h2 {
    font-size:25rem;
    line-height:17rem;
    @media only screen and ${devicemaxWidth.tablet} {
      font-size:7rem;
    }
  }

  h3 {
    font-size:4rem;
  }

  .dummy_nav {
    height:90px;
    background-color:${({theme}) => theme.body};
    position:fixed;
    top:0;
    left:0;
    right:0;
    display:flex;
    align-items:center;
    justify-content:center;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);


    a {
      font-size:3rem;
      font-weight:700;
    }
  }
`;