import light_loader from "../asset/image/loader/light-loader.gif";
import styled from "styled-components";
const StyledLoader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
`;

function Loader() {
  return (
    <StyledLoader>
      <img src={light_loader} alt="light loader" />
    </StyledLoader>
  );
}

export default Loader;
