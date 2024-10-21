import { useSession } from 'next-auth/react'
import LoadingState from '@/components/loading'
import { loadingStatus, authenticatedStatus } from '@/constants'
import LandingPage from './component'

// export default function IndexPage() {
//     const { status } = useSession()
//     if (status === loadingStatus) return <LoadingState />
//     if (status === authenticatedStatus) {
//         return <LandingPage />
//     }
// }

export { getServerSideProps, default } from './component'