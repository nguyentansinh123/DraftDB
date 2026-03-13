import "../styles/style.css";
import { TypeAnimation } from "react-type-animation";
import { components } from "../styles/homepage/homeComponents";

const Homepage = () => {
  return (
    <div className={components.general.container}>
      <div className={components.wrapper.container}>
        <div className="h-full items-center text-center">
          <h1 className={components.bigtext}>
            Bring your idea to
            <span className="dark-green-text block">
              <span className="flex justify-center">
                <span>the real&nbsp;</span>
                <TypeAnimation
                  sequence={[
                    "World",
                    3000,
                    "Market",
                    4000,
                    "Life",
                    () => {
                      console.log("Sequence completed");
                    },
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="w-60 text-left"
                />
              </span>
            </span>
          </h1>
        </div>
        <div className={components.smallText}>
          DraftDB is the visual database design platform. Kickstart your
          development by drawing your database schema, and get instant SQL
          scripts, migration files, and type definitions. Our platform offers a
          collaborative canvas, version history, powerful integrations, and
          seamless sharing to bring your data architecture to life.
        </div>
        <div className="buttonText mt-8 flex justify-center gap-4">
          <button className={components.button1}>Start your project</button>
          <button className={components.button2}>Request a demo</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
