import Bcrypt from 'bcryptjs'

export async function Verifypassword(candidatePassword:string,userpassword:string) {
    const isValid =  await Bcrypt.compare(candidatePassword,userpassword);
    return isValid;
}