import Navbar from "~/components/Navbar";
import { Container } from "@mui/material";
import { api } from "~/utils/api";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import ProductGrid from "~/components/ProductGrid";

export const getServerSideProps = withSession({ type: "KASIR" });

export default function productlist() {
  const { data, status } = useSession();
  const userData = api.user.getUserbyId.useQuery({
    id: data?.user.id as number,
  });
  return (
    <>
      <Navbar
        role={data?.user.role}
        username={userData.data?.username as string}
      ></Navbar>
      <Container maxWidth={false} className="mt-10 px-16 lg:px-16">
        <ProductGrid id={data?.user.id as number}></ProductGrid>
      </Container>
    </>
  );
}
