import SliderWrapper from "../../src/components/SliderWrapper";
import styles from "./index.module.scss";
import Back from "../../src/assets/icons/Back";
import Input from "../../src/components/Inputs/TextInput";
import {useForm,Controller} from "react-hook-form";
import DarkButton from "../../src/components/Buttons/Darked";
import Link from "next/link";
import PasswordInput from "../../src/components/Inputs/Password";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../../src/styles/globalStyles";
// import ThemeWrapper from "../../src/components/ThemeWrapper";
import styled, {useTheme} from 'styled-components';
import ThemeWrapper from "../../src/components/Wrappers/ProviderWrapper"
import LoaderComponent from "../../src/components/Loaders/input";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";
import { stat } from "fs";


export default function Signup() {

  const theme = useTheme();
  const Router = useRouter();
  const {status,data} = useSession();

  useEffect(() => {
    if(status === 'authenticated') {
      toast.warn("Log out first");
      setTimeout(() => Router.back(),500);
    }
  },[status])

  const [loading,setLoading] = useState(false);

  const {register,handleSubmit,getValues, watch,setError, formState:{errors,touchedFields,dirtyFields,isValid},control } = useForm({mode:'all'});

  const onSubmit = async (data:any) => {
    setLoading(true);
    const Response = await fetch('/api/v1/user/signup',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(data),
    }).then(res => res.json()).finally(() => setLoading(false));
    console.log("Response",Response);
    
    if(Response.status === 'success') {
        toast.success('Registered Succesfully');
        Router.push('/login');
    } else {
        if(Response.error.code === 11000) {
        toast.warn("User Already Exists");
      }
    }
    
  };


  if(status === 'loading') {
    return (
      <LoaderComponent />
    )
  }

  if(status === 'unauthenticated') {

    return (
        <SliderWrapper>
          <div className={styles.container}>
            {/* <Back color={theme.text} /> */}
            <h2 className={styles.heading}>Register Account</h2>
            <div className={styles.inputBoxContainer}>
                <form className={styles.inputBox} onSubmit={handleSubmit(onSubmit)}>
                  <p className={styles.headNote}>Let’s create your account</p>
                  <TwoColumn>
                        <Controller 
                            control={control}
                            name="fname"
                            render={({field: { onChange, onBlur, value, ref  }}) => (
                                <Input key={3} value={value} label="First Name" touchedField={touchedFields.fname} errors={errors.fname} register={register('fname',{
                                    minLength:{ value:3 , message:'Minimum 3 characters long'},required:true})} placeholder="Enter First Name" />
                            )}
                        />
                        <Controller 
                            control={control}
                            name="lname"
                            render={({field: { onChange, onBlur, value, ref  }}) => (
                                <Input key={3} value={value} label="Last / Middle Name" touchedField={touchedFields.lname} errors={errors.lname} register={register('lname',{minLength:{ value:3 , message:'Minimum 3 characters long'}})} placeholder="Enter Last Name" />
                            )}
                        />
                  </TwoColumn>
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
                            <PasswordInput key={4} value={value} label="Password" touchedField={touchedFields.password} errors={errors.password} register={register('password',{minLength:{value:8,message:'Minimum length should be 8'},pattern:{ value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , message:'At least one letter and one number' }})} placeholder="Enter Password" />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="passwordConfirm"
                        render={({field: { onChange, onBlur, value, ref  }}) => (
                            <PasswordInput key={5} value={value} label="Confirm Password" touchedField={touchedFields.passwordConfirm} errors={errors.passwordConfirm} register={register('passwordConfirm',
                                {validate:(val:string) => {
                                    
                                    if(watch('password') != val) {
                                        return "password do not match"
                                    }
                                }})} 
                                placeholder="Confirm Password"
                             />
                        )}
                    />
                    {loading ? <LoaderComponent /> : <div className={styles.cta}>
                        <DarkButton type="submit" label={"CREATE"} />
                    </div>}
                    <Link href="/login"><span className={styles.notice}>Already have an account?  <span style={{color:theme.paraText,fontWeight:600,margin:0}}>Login</span></span></Link>
                </form>
            </div>
          </div>
        </SliderWrapper>
    );
  }

 
  }

  const TwoColumn = styled.div`
    display:flex;
    gap:1rem;
    flex:1;
    & div {
        flex:1;
    }
  `;



  Signup.getLayout = function getLayout(page:any) {
    return (
      <ThemeWrapper>
        {page}
      </ThemeWrapper>
    )
  }