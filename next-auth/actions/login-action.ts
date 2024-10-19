"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const isValid = LoginSchema.safeParse(values);

  if (!isValid.success) {
    return { isSuccess: false, message: "Invalid fields" };
  }

  return { isSuccess: true, message: "You are logged-in" };
};
