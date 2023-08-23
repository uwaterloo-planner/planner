import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { UW_SCHEDULES_ENDPOINT } from '@/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const courses = req.query.course as string
        console.log('got request with courses: ', courses)
        const coursesArray: string[] = courses.split(',').map(str => str.trim());
    
        let coursesData: any[] = []
        await Promise.all(coursesArray.map(async (course) => {
            try {
                const response = await axios.get(UW_SCHEDULES_ENDPOINT + course, {
                    headers: {
                        'x-api-key': process.env.UWATERLOO_KEY
                    }
                })
                coursesData.push(response.data)
            } catch (err) {
                console.error(err)
            }
        }))
        console.log(coursesData)
        res.status(200).send(coursesData)
    } else {
        res.status(401).end()
    }
}

export default handler
