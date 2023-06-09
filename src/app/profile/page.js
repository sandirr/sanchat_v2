'use client'

import { auth, firestoreDB, generateToken, storage } from "@/configs/firebase";
import useInput from "@/hooks/hooks";
import { Box, Button, Container, FormControl, FormLabel, Heading, Image, Input, Stack } from "@chakra-ui/react";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function Profile(){
    const email = auth.currentUser?.email
    const uid = auth.currentUser?.uid

    const {value: name, onChange: onChangeName} = useInput('')
    const [photoUrl, setPhoto] = useState('')
    const [fcmToken, setFcmToken] = useState('')

    const handleGenerateToken = async () => {
        const fcm = await generateToken()
        setFcmToken(fcm)
    }

    useEffect(()=>{
        handleGenerateToken()
    },[])

    const handleUploadPhoto = async (event) => {
        const file = event.target.files[0]

        if(file){
            try{
                console.log('start loading')
                const storageRef = ref(storage, `users/${uid}`)
                await uploadBytes(storageRef, file)
                const link = await getDownloadURL(storageRef)
                setPhoto(link)
            } catch(err){
                console.log(err)
            } finally{
                console.log('stop loading')
            }
        }
    }

    const handleSaveProfile = async () => {
        const userRef = doc(firestoreDB, 'users', uid)
        await setDoc(userRef, {
            name,
            photoUrl,
            email,
            uid,
            fcmToken
        })
    }

    return(
        <Container maxW="md">
            <Box>
                <Heading>Profile</Heading>
            </Box>

            <Stack direction={'column'} spacing={1} mt={3}>
                {photoUrl &&
                <Image src={photoUrl} alt='photo-url' borderRadius={'50%'} objectFit={'cover'} />}
                <FormControl>
                    <FormLabel>Photo</FormLabel>
                    <Input type='file' onChange={handleUploadPhoto} accept="image/*" />
                </FormControl>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input value={name} onChange={onChangeName} type='text' />
                </FormControl>
                <Button w='full' mt={2} onClick={handleSaveProfile}>
                    Save
                </Button>
            </Stack>
        </Container>
    )
}