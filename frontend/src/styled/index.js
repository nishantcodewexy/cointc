import styled from "styled-components";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./theme";

function tailwindTheme() {
  return resolveConfig(tailwindConfig).theme;
}

export const colorScheme = tailwindTheme().colors;

export const _TheHero = styled.div`
  min-height: 737px;
  background: #0059ff;
  display: flex;
  flex-direction: column;
  padding-top: 75px;
  padding-bottom: 300px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 60%);
  .banner {
    width: 100%;
    height: 100%;
    max-width: 651px;
    top: 70px;
    position: relative;
  }
`;

export const _Title = styled.h1`
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 41px;

  color: #9dd2ff;
`;

export const SectionHeading = styled(_Title)`
  color: ${colorScheme.light["dark"]};
  position: relative;

  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 47px;
  color: #2b333d;
`;

export const SectionHeading1 = styled(SectionHeading)`
  top: -30px;
`;
export const _SubTitle = styled.h1`
  position: relative;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 29px;

  color: #9dd2ff;
`;

export const _WaveClip = styled.section`
  /* background: #85c4f9; */
  position: relative;
  margin-top: 165px;
  div {
    background: #85c4f9;
  }
  &:before {
    background: #85c4f9;
    width: 100%;
    height: 170px;
    content: "";
    display: block;
    position: relative;
    ${(props) =>
      props.top &&
      `clip-path: path('M416.071 71.9732C187.252 202.324 -33.2985 126.286 -114.972 71.9732L-471 566.575L1939.19 576.575L2125.71 648L2213.21 446.001C2223.05 157.326 2144.61 -89.6256 1752.18 71.9732C1359.75 233.572 1059.62 139.306 958.614 71.9732C873.107 17.6605 644.889 -58.3772 416.071 71.9732Z')`}
  }
  &:after {
    background: #85c4f9;
    width: 100%;
    min-height: 200px;
    content: "";
    display: block;
    position: relative;
    transform: rotate(180deg);
    ${(props) =>
      props.bottom &&
      `clip-path: path('M416.071 71.9732C187.252 202.324 -33.2985 126.286 -114.972 71.9732L-471 566.575L1939.19 576.575L2125.71 648L2213.21 446.001C2223.05 157.326 2144.61 -89.6256 1752.18 71.9732C1359.75 233.572 1059.62 139.306 958.614 71.9732C873.107 17.6605 644.889 -58.3772 416.071 71.9732Z')`}
  }
`;

export const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  header {
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 30px;
    letter-spacing: 0.07em;

    color: #2b333d;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 21px;
    /* or 162% */
    letter-spacing: 0.07em;

    color: #2b333d;
  }
`;

export const _Intro = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  /* or 120% */
  letter-spacing: 0.12em;
`;

export const _Button = styled.button`
  position: relative;
  min-height: 47px;
  border-radius: 6px;
  padding: 14px 20px;
  background: ${colorScheme.light.default};
  font-weight: 500;
  ${(props) => {
    const solid = props.solid;
    let bg =
      (props.primary && "primary") ||
      (props.secondary && "secondary") ||
      (props.tertiary && "tertiary") ||
      (props.light && "light") ||
      (props.dark && "dark") ||
      "default";

    let color =
      (props.primary && "primary") ||
      (props.secondary && "secondary") ||
      (props.tertiary && "tertiary") ||
      (props.light && solid ? "dark" : "light") ||
      (props.dark && solid ? "light" : "dark") ||
      "default";

    let style = `
    color: ${colorScheme.light[color]};
    ${
      solid
        ? `background: ${colorScheme.light[bg]}`
        : `background: none; border: 1px solid ${colorScheme.light[bg]}`
    };`;

    return style;
  }}
`;
