"use client";

import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/register-action";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [actionResponse, setActionResponse] = useState<{
    isSuccess: boolean;
    message: string;
  } | null>(null);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      registerAction(values).then((resp) => {
        setActionResponse({ ...resp });
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Register"
      headerLabel="get started with secure auth"
      backBtnLabel="already have an account"
      backBtnHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="my-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      placeholder="john doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@gmail.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="****"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!actionResponse?.isSuccess && (
            <FormError message={actionResponse?.message} />
          )}
          {actionResponse?.isSuccess && (
            <FormSuccess message={actionResponse?.message} />
          )}
          <Button type="submit" className="my-2 w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
