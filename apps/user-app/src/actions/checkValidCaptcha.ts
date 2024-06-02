"use server";

export default async function checkValidCaptcha(token: string) {
  try {
    let formData = new FormData();
	formData.append('secret', process.env.NEXT_CAPTCHA_KEY!);
	formData.append('response', token);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});
  const challengeSucceeded = (await result.json()).success;

  return challengeSucceeded;
  } catch (error) {
    console.log(error);
  }
  return null;
}
