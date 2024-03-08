import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/login?message=Unable to verify email`
      );
    }

    if (data.session) {
      const { user } = data.session;

      try {
        const createdUser = await prisma.user.create({
          data: {
            id: user?.id,
            email: user?.email ?? "",
            username: user.user_metadata.user_name,
            //   password: user.password,
          },
        });

        return NextResponse.redirect(`${origin}/`);
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(
          `${origin}/login?message=Unable to create user`
        );
      }
    }
  }

  return NextResponse.redirect(
    `${origin}/login?message=Unable to verify email`
  );
}
