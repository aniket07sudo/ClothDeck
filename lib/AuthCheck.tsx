import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { isSSR } from '../src/hooks/isSSR';

export const ProtectedRoute = (props) => {
    const session = useSession();
    const router = useRouter();
    
    if(!isSSR && session.data?.user === null) {
        router.push('/');
    }
    if(!session.data?.user) {
        return <p>Loading</p>
    }

    return props.children;

}