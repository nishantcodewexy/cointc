import TheLogo from "../components/TheLogo";
import UserSVG from "../images/svg/user.svg";
function Layout({ children }) {
  return (
    <div>
      <nav className="bg-black  text-white">
        <div className="container p-2 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-10">
              <div className="logo">
                <TheLogo />
              </div>
              <ul className="nav-links flex items-center gap-4">
                <li>P2P Trade</li>
                <li>Orders</li>
                <li>Wallet</li>
                <li>Affiliate</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <img
                src={UserSVG}
                style={{
                  height: 35,
                  width: 35,
                }}
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
export default Layout;
Layout.defaultName = "DefaultLayout";
