import NotFoundIllustration from "../images/svg/not_found.svg";
import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "App - Page Not Found"
  });

  return (
    <>
      <div className="container mx-auto ">
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="">
            <img
              alt="Under development"
              src={NotFoundIllustration}
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
