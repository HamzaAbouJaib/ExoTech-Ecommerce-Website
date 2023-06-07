import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const AccountForm = ({ preloaded }) => {
  const [savedChanges, setSavedChanges] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: preloaded.name,
      email: preloaded.email,
      mobile: preloaded.mobile,
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async ({
    name,
    email,
    mobile,
    password,
    confirmPassword,
  }) => {
    if (password === "" || confirmPassword === "") {
      setError(
        "password",
        { type: "custom", message: "Password is required" },
        { shouldFocus: true }
      );
      return;
    }

    await axios.put("/api/customers", {
      _id: preloaded._id,
      name,
      email,
      mobile,
      password,
    });
    setSavedChanges(true);
    password = "";
    confirmPassword = "";
    reset(
      {
        name,
        email,
        mobile,
        password,
        confirmPassword,
      },
      { keepDefaultValues: true }
    );
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <p>
        {savedChanges &&
          setInterval(() => {
            setSavedChanges(false);
          }, 5000) && (
            <p className="text-green-600 text-lg">
              Your changes have been saved!
            </p>
          )}
      </p>
      <table className="border-separate border-spacing-y-4 account-table">
        <tbody>
          <tr>
            <td className="font-semibold">Name</td>
            <td>
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
                <div className="text-red-600">
                  {errors.name.message.toString()}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Email</td>
            <td>
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
                <div className="text-red-600">{errors.email.message.toString()}</div>
              )}
            </td>
          </tr>
          <tr>
            <td className="lg:pr-16 font-semibold">Phone Number</td>
            <td>
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
                <div className="text-red-500">{errors.mobile.message.toString()}</div>
              )}
            </td>
          </tr>
          <tr>
            <td className="lg:pr-16 font-semibold">Reset Password</td>
            <td className="lg:pt-10">
              <label>New Password</label>
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
                <div className="text-red-600 ">{errors.password.message.toString()}</div>
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label>Confirm Password</label>
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
                  {errors.confirmPassword.message.toString()}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className="text-red-500 ">Passwords do not match</div>
                )}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn-primary mt-3">Save Changes</button>
    </form>
  );
};

export default AccountForm;
