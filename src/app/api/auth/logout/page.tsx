"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Logout(){
    const {data: session} = useSession();
    const keycloak_issuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(()=>{
        (async () =>{
            if (session?.idToken){
                const keycloakLogoutUrl = `${keycloak_issuer}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
                    `${baseUrl}/login`
                )}&id_token_hint=${session!.idToken}`;
                window.location.href = keycloakLogoutUrl;
            }
        })();
    }, []);
    return <p>Logging out...</p>
}