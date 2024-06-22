import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { DJANGO_BACKEND_URL, SCHEDULES_EP } from '@/constants'
import { snakeToCamel } from '@/utils'
import { getToken } from 'next-auth/jwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {	
    const token = await getToken({ req })

    if (token) {
        const courses = req.query.courses

        try {
            const response = await axios.get(DJANGO_BACKEND_URL + SCHEDULES_EP, {
                params: {
                    courses: courses
                }
            })
            res.status(200).send(snakeToCamel(response.data))
        } catch (e: any) {
            res.status(500).send({ message: "Internal Server Error", error: e.message } )
        }
    } else {
        res.status(401).end()
    }
}

export default handler
