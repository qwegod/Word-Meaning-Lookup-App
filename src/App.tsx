import { useEffect, useRef, useState } from "react";
import dictionary from "./dictionary.json";
import clsx from "clsx";
import { keyboardKey } from "@testing-library/user-event";

interface Dictionary {
  [key: string]: string[];
}

function App() {
  const [word, setWord] = useState("");
  const [suggest, setSuggest] = useState<string | undefined>("");
  const [eq, setEq] = useState(false);
  const [containerW, setContainerW] = useState(30);
  const dict = dictionary as Dictionary;
  const definitions = useRef<HTMLDivElement | null>(null);
  const [showNewElements, setShowNewElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewElements(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [word]);

  useEffect(() => {
    if (definitions.current) {
      let el = definitions.current.offsetHeight;

      if (el < window.innerHeight - 150 && containerW !== 30) {
        setContainerW(containerW - 1);
      } else if (el > window.innerHeight - 150) {
        if (containerW === 100) return;
        setContainerW(containerW + 1);
      }
    }
  }, [word, containerW]);

  useEffect(() => {
    const handleKeyPress = (e: keyboardKey) => {
      if (suggest && e.key === "Enter") {
        setWord(suggest);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [suggest]);

  useEffect(() => {
    word
      .split("")
      .forEach((sym, index) =>
        suggest?.split("")[index] === sym ? setEq(true) : setEq(false)
      );

    setSuggest(Object.keys(dict).find((e) => e.startsWith(word)));

    word === "" && setSuggest("");
  }, [dict, suggest, word]);

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden bg-[#2D2D3A]">
      <div
        style={{
          width: `${containerW}vw`,
          transition: "width 500ms ease",
        }}
        className={clsx(
          "bg-[#222831] shadow-2xl flex-col rounded-2xl h-screen flex items-center p-4"
        )}
      >
        <div
          className={clsx(
            "relative mb-5 flex items-center p-1 h-max rounded-2xl animate-text"
          )}
        >
          <input
            onChange={(e) => {
              setWord(e.target.value);
              setShowNewElements(false);
            }}
            value={word}
            className="w-[260px] shadow-[0px_1px_1px_1px_rgba(0,0,0,0.5)] pl-3 bg-[#F5F5FA] focus:outline-none text-gray-400 h-[40px] rounded-xl font-bold "
            placeholder="word"
            type="text"
          />
          <span
            className={clsx(
              "absolute left-4 font-bold opacity-40",
              !eq && "hidden"
            )}
          >
            {suggest}
          </span>
        </div>
        <div
          ref={definitions}
          className={`flex flex-col overflow-y-scroll w-full gap-y-6 `}
        >
          {Object.keys(dict).some((el) => el === word) &&
            !showNewElements &&
            [...Array(dict[word].length)].map((el) => (
              <div
                key={el}
                className="relative bg-[#3C3C52] mb-2 text-[#E5E5E5] font-bold shadow-[0_4px_8px_0px_rgba(0,0,0,0.5)] rounded-lg p-2 h-14 animate-pulse"
              >
                <div className="absolute bg-[#47475a] top-1 rounded-xl h-1/4 w-11/12" />
                <div className="absolute bg-[#4e4e5e] bottom-1 rounded-xl h-1/4 w-2/3" />
              </div>
            ))}

          {Object.keys(dict).some((el) => el === word) &&
            showNewElements &&
            dict[word].map((el, index) => (
              <div
                key={index}
                className="relative bg-[#3C3C52] mb-2 text-[#E5E5E5] font-bold shadow-[0_4px_8px_0px_rgba(0,0,0,0.5)] rounded-lg p-2 h-auto"
              >
                <span className="animate-card">{el}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
