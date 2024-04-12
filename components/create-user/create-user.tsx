"use client";
// This component renders a form to create a new user
import { ReactNode, useState } from "react";
import { TextInput, Button, Box, Title, CheckIcon } from "@mantine/core";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const formSchema = object({
  email: string().email("Invalid email address"),
  avatar: string().url("Invalid URL"),
  job: string().optional(),
});

type CreateUserPageProps = React.ComponentPropsWithoutRef<"div">;

export default function CreateUser({ ...props }: CreateUserPageProps) {
  const [isFormMsg, setIsFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        console.error("Failed to create the user:", res.statusText);
        setErrorMessage("status code: " + res.statusText);
      }

      setIsFormMsg(true);
      router.refresh();
      reset(); // re-set the form after successful submission
    } catch (error) {
      console.error("Failed to create user: ", error);
    }
  });

  return (
    <Box mx="auto" maw={400} {...props}>
      <form onSubmit={onSubmit}>
        <TextInput
          className="mb-2"
          label="Email"
          placeholder="Enter Email"
          {...register("email")}
        />

        {errors.email?.message && (
          <p className="text-red-500 w-full text-right font-normal text-xs opacity-90 mt-2">
            {errors.email?.message as ReactNode}
          </p>
        )}
        <TextInput
          className="mb-2"
          label="Avatar URL"
          placeholder="Enter Avatar URL"
          {...register("avatar")}
        />
        {errors.avatar?.message && (
          <p className="text-red-500 w-full text-right font-normal text-xs opacity-90 mt-2">
            {errors.avatar?.message as ReactNode}
          </p>
        )}
        <TextInput
          className="mb-2"
          label="Job title"
          placeholder="Enter Job description"
          {...register("job")}
        />
        {errors.job?.message && (
          <p className="text-red-500 w-full text-right font-normal text-xs opacity-90 mt-2">
            {errors.job?.message as ReactNode}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 w-full text-right font-normal text-xs opacity-90 mt-2">
            {errorMessage}
          </p>
        )}
        <Button
          type="submit"
          radius={"md"}
          mt="sm"
          w={"100%"}
          variant="light"
          size="md"
        >
          Create User
        </Button>
      </form>
      {isFormMsg && (
        <div className="w-full mt-2 flex justify-center items-center flex-col gap-4">
          <Title
            size={"24px"}
            className="gap-2 text-white inline-flex flex-row justify-center items-center"
          >
            <CheckIcon size={24} />
            User created
          </Title>
        </div>
      )}
    </Box>
  );
}
