'use client'

import { Box, Button, Container, Heading } from "@chakra-ui/react";
import {auth, firestoreDB} from '../../configs/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Auth(){
    const handleLogin = async () => {
        const googleProvider = new GoogleAuthProvider()
        const data = await signInWithPopup(auth, googleProvider)
        const uid = data.user.uid

        // check apakah user sudah terdaftar
        const userRef = doc(firestoreDB, `/users/${uid}`)
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()){
            // alihkan ke halaman chat
        }else{
            // alihkan ke halaman lengkapi profil
        }


    }

    return(
        <Container maxW="md">
            <Box height={"100vh"} display='flex' alignItems={'center'}>
                <Box flex={1} mt={-12}>
                    <Heading size='md' textAlign={'center'}>Login</Heading>
                    <Button  colorScheme='teal' variant='solid' w='full' mt={4} onClick={handleLogin}>
                        Login with Google
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}