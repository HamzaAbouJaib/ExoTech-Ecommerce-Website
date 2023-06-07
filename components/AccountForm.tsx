import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

const AccountForm = ({ preloaded }) => {
  const [savedChanges, setSavedChanges] = useState(false);
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [userPassword, setUserPassword] = useState<string>();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
    setValue("mobile", preloaded.mobile);
  }, [session.user, setValue]);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  async function confirmChanges() {
    const name = getValues("name");
    const email = getValues("email");
    const mobile = getValues("mobile");
    try {
      console.log(email, session.user.email);
      console.log(email === session.user.email);

      await axios.put("/api/customers", {
        _id: preloaded._id,
        name,
        email,
        mobile,
        password: userPassword,
      });
      await signIn("credentials", {
        redirect: false,
        email,
        password: userPassword,
      });

      setValue("name", name);
      setValue("email", email);
      setValue("mobile", mobile);
      setSavedChanges(true);
      setOpenModal(false);
      setUserPassword("");
    } catch (err) {}
  }

  const submitHandler = async ({
    name,
    email,
    mobile,
    password,
    confirmPassword,
  }) => {
    if (password === "" || confirmPassword === "") {
      setOpenModal(true);
      return;
    }

    try {
      await axios.put("/api/customers", {
        _id: preloaded._id,
        name,
        email,
        mobile,
        password,
      });
      setSavedChanges(true);
      console.log(password);
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
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
    } catch (error) {
      setError(
        "email",
        { type: "custom", message: "Email already in use" },
        { shouldFocus: true }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {openModal && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center m-auto bg-gray-500/50">
          <div className="bg-white p-5 rounded-md md:w-[500px] w-[90%]">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xl mb-5">
                Enter your password to confirm changes
              </h3>
            </div>
            <input
              className="w-full text-lg border-2 border-gray-200 py-1 px-3 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                className="btn-primary"
                onClick={confirmChanges}
              >
                Update
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
                <div className="text-red-600">
                  {errors.email.message.toString()}
                </div>
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
                <div className="text-red-500">
                  {errors.mobile.message.toString()}
                </div>
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
                <div className="text-red-600 ">
                  {errors.password.message.toString()}
                </div>
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
