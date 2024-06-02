import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { token }: {token: string} = await req.json();
        let formData = new FormData();
        console.log(token);
        formData.append('secret', process.env.NEXT_CAPTCHA_KEY!);
        formData.append('response', token);
    
      const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });

      const resJson =  (await result.json());
      const challengeSucceeded = resJson.success;

      console.log(resJson)  
    
      return NextResponse.json(
        { message: challengeSucceeded ? "Success" : "Invalid Captcha, Please retry..." },
        { status: challengeSucceeded ? 200 : 400}
      );
      } catch (error) {
        console.log(error);
      }
      return NextResponse.json(
        { message: "Invalid Captcha, Please retry..." },
        { status: 400 }
      );
}
