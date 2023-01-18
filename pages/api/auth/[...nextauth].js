import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/UserModel";
import { manager } from "../../../lib/createConnection";
import { Verifypassword} from "../../../lib/Verifypassword"

export default NextAuth({
    session:{
        strategy:'jwt'
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials,req) {
                await manager.connect();
                // const {email,password} = req.body;
                const {email,password} = req.body;

                if(!email || !password) {
                    throw new Error('Provide Email and password');
                }
                const user = await User.findOne({email}).select('+password');
                // console.log("Correct pass",(await user.verifypassword(password,user.password)));

                if(!user) {
                    throw new Error('User doesn\'t Exists !');
                }
                
                if(!(await Verifypassword(password,user.password))) {
                    throw new Error('Incorrect Email or Password');
                }
                console.log("JWT",user.email,typeof user._id.toString());

                let obj = {
                    email:user.email,
                    name:user.fname,
                    id:user._id.toString(),
                    image:user.image,
                    username:'Userrr'
                }
                
                return obj;
            },
        }),
    ],
    secret:process.env.NEXT_PUBLIC_SECRET
    // callbacks:{
    //     session:async (session,user) => {
    //         session.id = user.id;
    //         console.log("Callback Sess",session);
    //         return Promise.resolve(session)
    //     }
        
    // }
})

