import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://api.airtable.com/v0/app6nwqznUPZ0jMIX/Movies', {
        headers: {
            // Authorization: `Bearer ${'patwOmEL1d1hbSvac.64accd1ce9d2561c216562af17c21eafbfae6381a9200ec9d98389c1b9213137'}`,
             Authorization: `Bearer ${'patwOmEL1d1hbSvac.64accd1ce9d2561c216562af17c21eafbfae6381a9200ec9d98389c1b9213137'}`,
        },
        next: {
            revalidate: 10,
        }
    });
    const data = await response.json();

    return NextResponse.json(data.records);
}