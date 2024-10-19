"use client";

import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import * as z from "zod";
import { loginAction } from "@/actions/login-action";

const LoginForm = () => {
  const [actionResponse, setActionResponse] = useState<{
    isSuccess: boolean;
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setActionResponse(null);
    startTransition(() => {
      loginAction(values).then((resp) => {
        setActionResponse({ ...resp });
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Login"
      headerLabel="Welcome back"
      backBtnLabel="Don't have an account"
      backBtnHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
