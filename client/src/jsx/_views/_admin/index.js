import { useState, useEffect } from "react";

function AdminRoot() {
  return (
    <>
      <NavBar />
      <SideBar />
      <div>
        <Currencies />
      </div>
    </>
  );
}

function Currencies() {
  /*
  ACTIONS:
  - Fetch (isListModified, setIsListModified)
  - Edit/update -> Refetch
  - Delete -> Refetch
*/

  const [name, setName] = useState(null);
  const [list, setList] = useState([]);
  const [state, setState] = useState(null);

  const ACTIONS = {
    update: "CURRENCY_UPDATE",
    create: "CURRENCY_CREATE",
  };

  const log = ({ type }) => {
    console.log("ACTION", type);
    setState(ACTIONS[type]);
  };

  const dispatch = {
    update() {
      log({ type: "update" });
    },
    create() {
      log({ type: "create" });
    },
  };

  function fetchList() {
    if (state) {
      setState(null);
      return;
    }
    let range =
      "ABCDEFGHIJKLMNOPQRStUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|?/~!@#$%^&*_+=-";
    let len = Math.floor(Math.random() * range.length + 1);
    let list = [];
    for (var i = 0; i <= len; ++i) {
      let start = Math.floor(Math.random() * (range.length / 2) + 1);
      let str = "";
      for (var m = 0; m <= start; ++m) {
        let end = Math.ceil(Math.random() * (range.length / 2) + 1);
        str += range[end];
      }
      list.push(str);
    }
    console.log(list);
    setList(list);
  }
  useEffect(() => {
    fetchList();
  }, [state]);

  return (
    <div>
      <h1>Home page</h1>
      <p>{name}</p>
      <h3>List ({list.length})</h3>
      <div
        style={{
          height: "75vh",
          background: "#ededed",
          padding: 5,
          marginTop: 10,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        <ol>
          {list.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ol>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button onClick={dispatch.update}>Refresh list</button>
        <button onClick={dispatch.create}>Create list</button>
      </div>
    </div>
  );
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
