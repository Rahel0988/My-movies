
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
     const response = await fetch('https://api.airtable.com/v0/app6nwqznUPZ0jMIX/Comments', {
        // const response = await fetch('https://api.airtable.com/v0/appBDIWPFLg0qOQIl/comments', {
        

        headers: {
            Authorization: `Bearer ${'patwOmEL1d1hbSvac.64accd1ce9d2561c216562af17c21eafbfae6381a9200ec9d98389c1b9213137'}`,
        },
        next: {
            revalidate: 0,
        }
    });
    const data = await response.json();

    return NextResponse.json(data.records);
}

export async function POST(request: NextRequest) {
    const responseData = await request.json();
    console.log('Plain data: ', responseData);

    const response = await fetch('https://api.airtable.com/v0/app6nwqznUPZ0jMIX/Comments', {
        headers: {
            Authorization: `Bearer ${'patwOmEL1d1hbSvac.64accd1ce9d2561c216562af17c21eafbfae6381a9200ec9d98389c1b9213137'}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            records: [{
                fields: {
                    Comment: responseData.commentContent
                }
            }]
        }),
    });
    const data = await response.json();

    return NextResponse.json(data);
}