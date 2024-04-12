import CreateUser from "@/components/create-user/create-user";
import Navbar from "@/components/navbar/navbar";
import { TableSelection } from "@/components/table-section/table-section";
import { UserData } from "./types/UserData";
export default async function Home() {
  const users: UserData[] = await fetch(
    "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users",
    { cache: "no-cache" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      console.error(err);
    });

  return (
    <main className="max-w-screen-xl mx-auto h-screen items-center justify-center">
      <Navbar />
      <div className="w-full h-full flex flex-col lg:flex-row   ">
        <div className="border-2 border-white basis-2/3 overflow-y-auto overscroll-auto py-10 ">
          <TableSelection users={users} />
        </div>
        <div className="border-2   border-white basis-1/2 py-10   ">
          <CreateUser />
        </div>
      </div>
    </main>
  );
}
