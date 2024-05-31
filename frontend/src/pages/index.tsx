import LoadingState from '@/components/loading'
import { loadingStatus, authenticatedStatus } from '@/constants'
import { Button } from '@mui/material'
import { useSession, signOut } from 'next-auth/react'

export default function IndexPage() {
    const { status } = useSession()
    if (status === loadingStatus) return <LoadingState />
    if (status === authenticatedStatus) {
        return (
            <div>
                <Button variant="outlined" onClick={() => signOut()}>Sign Out</Button>
            </div>
        )
    }
}