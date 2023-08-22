import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const course = req.query.course

    console.log(course, req.query)
    res.status(200).json({ name: 'John Doe' })

}

export default handler