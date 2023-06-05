import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { status } = useSession();
  const router = useRouter();

  if (status && status === "authenticated") {
    router.push("/");
  }

  async function logIn() {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 pt-48 min-h-screen">
        <div className={"w-full md:w-[70%] lg:w-[50%] xl:w-[40%] m-auto"}>
          <h2 className="text-3xl font-semibold mb-2">Login</h2>
          <hr className={"w-full border-gray-500"}></hr>
          <div className="mt-2 flex flex-col gap-1">
            <label className="font-semibold mt-1 text-lg">Email</label>
            <input
              type="email"
              placeholder="guest@example.com"
              autoFocus={true}
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <label className="font-semibold mt-2 text-lg">Password</label>
            <input
              type="password"
              placeholder="password"
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <p className="text-red-600 text-lg">
              {error === "CredentialsSignin" && "Invalid Credentials"}
            </p>
            <button
              className="bg-primary px-4 py-2 rounded-md font-semibold text-white hover:bg-primary/90 duration-500 w-max mt-4 mb-2 text-lg"
              onClick={logIn}
            >
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <Link
                className="text-primary font-semibold hover:text-primary/90 hover:underline"
                href={"/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
