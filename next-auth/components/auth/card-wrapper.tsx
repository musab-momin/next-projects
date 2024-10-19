import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import SocialAuth from "@/components/auth/social-auth";
import BackBtn from "./back-btn";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="bg-white rounded-lg p-4 min-w-[400]">
      <CardHeader className="text-center p-2">
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <SocialAuth />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
