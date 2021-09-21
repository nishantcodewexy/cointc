import { useEffect } from "react";
import {
  _TheHero,
  _Title,
  _SubTitle,
  SectionHeading,
  SectionHeading1,
  _Button,
  _Intro,
  _WaveClip,
  FeatureCard,
} from "../styled";
import HeroBanner from "../images/svg/hero_banner.svg";
import HowItWorkSVG from "../images/svg/how_it_works.svg";
import HowItWorkStepsSVG from "../images/svg/steps.svg";
import ShieldSVG from "../images/svg/shield.svg";
import GiftSVG from "../images/svg/gift.svg";
function HomePage() {
  useEffect(() => {
    document.title = "App - Home page";
  });
  return (
    <div>
      <_TheHero>
        <div className="container px-4 mx-auto ">
          <div className="flex flex-wrap items-center h-full relative">
            <header className="flex-1 flex flex-col  gap-6 py-10">
              <_Title>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </_Title>

              <_SubTitle>
                Lorem Ipsum has been the industry's standard dummy text ever
              </_SubTitle>
              <div className="flex gap-6">
                <_Button solid light>
                  Sign up to Join
                </_Button>
                <_Button outlined light>
                  Token Distribution
                </_Button>
              </div>
            </header>
            <div className="flex-auto flex flex-col relative items-center h-full justify-end">
              <img src={HeroBanner} alt="" className="banner" />
            </div>
          </div>
        </div>
      </_TheHero>

      <section className="">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap gap-10 ">
            <div className="flex flex-col gap-8 flex-1">
              <header>
                <SectionHeading1>
                  We built a platform for The crypto trading Industry
                </SectionHeading1>
              </header>
              <_Intro>
                Cryptocurrency exchanges or digital currency exchanges (DCE) are
                businesses that allow customers to trade cryptocurrencies or
                digital currencies for other assets.
              </_Intro>
              <_Intro>
                Creators of digital currencies are often independent of the DCEs
                that trade the currency.
              </_Intro>
            </div>
            <div className="top-10 relative flex-auto flex flex-col items-center py-20">
              <img src={HowItWorkSVG} alt="how it works" />
            </div>
          </div>
        </div>
      </section>

      <_WaveClip className="" top bottom>
        <div>
          <div className="container mx-auto flex flex-col gap-10 py-10">
            <header className="flex flex-col gap-4 text-center max-w-screen-md mx-auto">
              <_Intro>WHAT IS CRYPTCON</_Intro>
              <SectionHeading>How it Works</SectionHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </header>

            <div className="flex flex-wrap gap-20 ">
              <div className="flex-1 flex flex-col items-center">
                <img src={HowItWorkStepsSVG} alt="" className="" />
              </div>

              <div className="flex-1 p-10 flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                  <header className="flex flex-col gap-4">
                    <SectionHeading>
                      We’ve built a platform to buy and sell shares.
                    </SectionHeading>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer
                    </p>
                  </header>

                  <ul className="flex flex-col gap-4">
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis sapiente eveniet, provident quo est assumenda
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis sapiente eveniet, provident quo est assumenda
                      architecto vel modi quaerat aspernatur porro voluptas
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      ratione distinctio dolores, quia ab dolorem perferendis
                      quisquam!
                    </li>
                    <li>
                      Ratione distinctio dolores, quia ab dolorem perferendis
                      quisquam!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </_WaveClip>

      <section className="py-10">
        <div className="container mx-auto">
          <div className="flex flex-col gap-20 py-10">
            <header className="flex flex-col gap-4 text-center max-w-screen-md mx-auto">
              <_Intro>CRYPTCON FEATURE</_Intro>
              <SectionHeading>Best Features</SectionHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </header>

            <div className="grid grid-cols-3 gap-20">
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Safe & Secure</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Safe & Secure</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Early Bonus</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Univarsal Access</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Secure Storage</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
              <FeatureCard>
                <figure>
                  <img src={ShieldSVG} />
                </figure>
                <header>
                  <h4>Low Cost</h4>
                </header>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </p>
              </FeatureCard>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
