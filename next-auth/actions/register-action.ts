"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const isValid = RegisterSchema.safeParse(values);

  if (!isValid.success) {
    return { isSuccess: false, message: "Invalid fields" };
  }

  return { isSuccess: true, message: "You are logged-in" };
};
