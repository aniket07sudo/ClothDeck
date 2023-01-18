import SliderWrapper from "../../src/components/SliderWrapper";
import styles from "./index.module.scss";
import Back from "../../src/assets/icons/Back";
import Input from "../../src/components/Inputs/TextInput";
import {useForm,Controller} from "react-hook-form";
import DarkButton from "../../src/components/Buttons/Darked";
import Link from "next/link";
import PasswordInput from "../../src/components/Inputs/Password";
import { useCallback, useEffect, useState } from "react";
import { GlobalStyles } from "../../src/styles/globalStyles";

// import ThemeWrapper from "../../src/components/ThemeWrapper";
import styled, {useTheme} from 'styled-components';
import ThemeWrapper from "../../src/components/Wrappers/ProviderWrapper"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import LoaderComponent from "../../src/components/Loaders/input";
import { useUser, useUserDispatch } from "../../src/store/user/UserProvider";



export default function Login() {

  const theme = useTheme();

  const Router = useRouter();

  const [loading,setLoading] = useState(false);

  const {status,data:SessionData} = useSession();

  console.log("Login",status);
  
  const {register,handleSubmit,getValues, watch,setError, formState:{errors,touchedFields,dirtyFields,isValid},control } = useForm({mode:'all'});

  const onSubmit = useCallback((data:any) => {
    setLoading(true);
    signIn('credentials',{
      redirect:false,
      ...data
    }).then(res => {
        console.log(res);
        if(res?.ok) {
          Router.push('/');
          toast.success('Logged In Successfully');
          return ;
        }
        toast.error(res.error)
        setLoading(false);
        return;
    })
  },[])

  useEffect(() => {
    if(status === 'authenticated') {
      // toast.success("You are already Logged In");
      setTimeout(() => Router.back(),500);
    }
  },[status])

  if(status == 'loading') {
    return (
      <LoaderComponent />
    )
  }

 

  if(status === 'unauthenticated') {

    return (
        <SliderWrapper>
          {/* <div className={styles.container} style={{backgroundImage:'url("/Images/Login_1.png")'}}> */}
          <div className={styles.container}>
            <h2 className={styles.heading}>Welcome to ClothDeck</h2>
            <div className={styles.inputBoxContainer}>
                <form className={styles.inputBox} onSubmit={handleSubmit(onSubmit)}>
                  <p className={styles.headNote}>Login to your account</p>
                  <Controller 
                      control={control}
                      name="email"
                      render={({field: { onChange, onBlur, value, ref  }}) => (
                        <Input key={3} value={value} label="Email" touchedField={touchedFields.email} errors={errors.email} register={register('email',{required:true,pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }})} placeholder="Enter Email" />
                      )}
                    />
                    <Controller 
                      control={control}
                      name="password"
                      render={({field: { onChange, onBlur, value, ref  }}) => (
                        <ForgotContainer>
                          <PasswordInput key={4} value={value} label="Password" touchedField={touchedFields.password} errors={errors.password} register={register('password',{minLength:7})} placeholder="Enter Password" />
                          <div className="forgotPassLink"><Link className={styles.forgotpasslink} href="/forgot">Forgot Password?</Link></div>
                        </ForgotContainer>
                      )}
                    />
                    {/* <div style={{padding:20}} onClick={() => dispatch({type:'SET'})}>Dispatch</div> */}
                    {loading ? <LoaderComponent /> : <div className={styles.cta}>
                        <DarkButton type="submit" label={"LOGIN"} />
                    </div>}
                    {/* <DarkButton type="submit" label="LOGIN" /> */}
                    <Link href="/signup"><span className={styles.notice}>Don’t have an account? <span style={{color:theme.paraText,fontWeight:600,margin:0}}>Register</span></span></Link>
                </form>
            </div>
          </div>
        </SliderWrapper>
    );
  }

 
  
  }

  const ForgotContainer = styled.div`
  .forgotPassLink {
      margin-top:1rem;
      font-size:1.4rem;
      text-align:right;
      font-weight:500;
  }
`;

  Login.getLayout = function getLayout(page:any) {
    return (
      <ThemeWrapper>
        {page}
      </ThemeWrapper>
    )
  }