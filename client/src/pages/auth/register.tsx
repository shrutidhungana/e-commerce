import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import Link from "next/link";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { FormData, RegisterResponse } from "@/types";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useToast } from "@/hooks/use-toast";

type RegisterProps = {};

const initialState: FormData = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister: React.FC<RegisterProps> = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      const response = data as {
        payload: RegisterResponse;
        meta: {
          requestStatus: "fulfilled" | "pending" | "rejected";
        };
      };
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
       toast({
         title: "Success!",
         description: response.payload.message, // Custom message
         duration: 5000, // Duration in milliseconds
         type: "success", // Type of toast (success, error, info, etc.)
         // Optionally, you can add a custom class for styling
         className: "bg-green-500 text-white", // Example styling class
       });
        router.push("/auth/login");
      }
    });
  };

  console.log(formData);

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link
              href="/auth/login"
              className="font-medium ml-2 text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </AuthLayout>
  );
};
export default AuthRegister;
