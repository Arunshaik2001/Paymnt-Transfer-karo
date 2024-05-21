import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Form />
    </div>
  );
}
