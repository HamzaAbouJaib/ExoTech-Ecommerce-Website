import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Layout from "@/components/Layout";

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status && status === "authenticated") {
    router.push("/");
  }

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm({});

  const submitHandler = async ({
    name,
    email,
    mobile,
    password,
    confirmPassword,
  }) => {
    if (password === "" || confirmPassword === "") return;

    try {
      await axios.post("/api/customers", {
        name,
        email,
        mobile,
        password,
      });

      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      setError(
        "email",
        { type: "custom", message: "Email already in use" },
        { shouldFocus: true }
      );
    }
  };

  return (
    <Layout>
      <div className="w-[80%] m-auto mb-10 pt-48 min-h-screen">
        <div className={"w-full md:w-[70%] lg:w-[50%] xl:w-[40%] m-auto"}>
          <h2 className="text-3xl font-semibold mb-2">Register</h2>
          <hr className={"w-full border-gray-500"}></hr>
          <form
            className="mt-2 flex flex-col gap-1"
            onSubmit={handleSubmit(submitHandler)}
          >
            <label className="font-semibold mt-1 text-lg">Name</label>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Name"
              id="name"
              ref={register}
              {...register("name", {
                required: "Please enter a name",
              })}
            />
            {errors.name && (
              <div className="text-red-600">{errors.name.message}</div>
            )}
            <label className="font-semibold mt-2 text-lg">Email</label>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Email address"
              id="email"
              type="email"
              {...register("email", {
                required: "Please enter an email",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
            <label className="font-semibold mt-2 text-lg">
              Phone Number{" "}
              <span className="text-sm text-gray-600">(optional)</span>
            </label>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Phone number"
              id="mobile"
              {...register("mobile", {
                pattern: {
                  value: /^[0-9-()+ ]+$/i,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}
            <label className="font-semibold mt-2 text-lg">Password</label>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="New password"
              id="password"
              type="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-600 ">{errors.password.message}</div>
            )}
            <label className="font-semibold mt-2 text-lg">
              Confirm Password
            </label>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Confirm password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value: string) => value === getValues("password"),
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-600 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Passwords do not match</div>
              )}
            <button className="bg-primary px-4 py-2 rounded-md font-semibold text-white hover:bg-primary/90 duration-500 w-max mt-4 mb-2 text-lg">
              Register
            </button>
            <p>
              Have an account?{" "}
              <Link
                className="text-primary font-semibold hover:text-primary/90 hover:underline"
                href={"/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
