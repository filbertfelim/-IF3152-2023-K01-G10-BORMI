import { useSession } from "next-auth/react";
import { withSession } from "~/server/auth/withSession";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const getServerSideProps = withSession({ type: "NOT_REQUIRED" });

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      if (data === null) {
        void router.push("/login");
      } else {
        if (data.user.role === "ADMIN") {
          void router.push("/dashboard-user");
        } else if (data.user.role === "KASIR") {
          void router.push("/cart");
        } else {
          void router.push("/dashboard-product");
        }
      }
    }
  }, [data, router, status]);
}
