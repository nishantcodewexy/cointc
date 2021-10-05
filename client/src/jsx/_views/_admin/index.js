import { useState } from "react";

function AdminRoot() {
  return (
    <>
      <NavBar />
      <SideBar />
      <div>
        <HomePage />
      </div>
    </>
  );
}

function HomePage() {
  const [name, setName] = useState(null);
  setName("Home page");
  return <div>Home page</div>;
}
function NavBar() {
  const [name, setName] = useState(null);
  // setName("SideBar");
  return <nav>Navbar</nav>;
}

function SideBar() {
  const [name, setName] = useState(null);
  // setName("SideBar");
  return <section>Sidebar</section>;
}
export default AdminRoot;
