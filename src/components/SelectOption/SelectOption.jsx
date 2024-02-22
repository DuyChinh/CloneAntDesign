import { useState, useRef } from "react";
import classes from "./SelectOption.module.css"
const arrOptions = [
  { id: 0, option: "a10" },
  { id: 1, option: "b11" },
  { id: 2, option: "c12" },
  { id: 3, option: "d13" },
  { id: 4, option: "e14" },
  { id: 5, option: "f15" },
  { id: 6, option: "g16" },
  { id: 7, option: "h17" },
  { id: 8, option: "i18" },
  { id: 9, option: "j19" },
  { id: 10, option: "k20" },
  { id: 11, option: "l21" },
  { id: 12, option: "m22" },
  { id: 13, option: "n23" },
  { id: 14, option: "o24" },
  { id: 15, option: "p25" },
  { id: 16, option: "q26" },
  { id: 17, option: "r27" },
  { id: 18, option: "s28" },
  { id: 19, option: "t29" },
  { id: 20, option: "u30" },
  { id: 21, option: "w32" },
  { id: 22, option: "x33" },
  { id: 23, option: "y34" },
  { id: 24, option: "z35" },
];


const SelectOption = () => {
  const [showOption, setShowOption] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [value, setValue] = useState("");
  const [activeOptions, setActiveOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [optionsDefault, setOptionsDefault] = useState(arrOptions);
  const inputRef = useRef(null);

  const handleShowOption = (e) => {
    e.stopPropagation();
    setShowOption(!showOption);
    setInputFocus(true);
    if(options.length > 0) {
      setDeleteAll(true);
      inputRef?.current?.focus();
    }
  }

  const handleOut = () => {
    setShowOption(false);
    setDeleteAll(false);
    setInputFocus(false);
    setOptionsDefault(arrOptions);
    setValue("");
  }

  const handleChangeInput = (e) => {
    const valueInput = e.target.value;
    if(valueInput.length > 0) {
      console.log(valueInput);
      const updatedOptionsDefault = arrOptions.filter((item) => item.option.includes(valueInput));
      console.log(updatedOptionsDefault);
      setOptionsDefault(updatedOptionsDefault);
      setValue(valueInput);
      setDeleteAll(true);
    }
    if(valueInput.length === 0) {
      setDeleteAll(false);
      setValue("");
      setOptionsDefault(arrOptions);
    }
    setShowOption(true);
  }

  const handleDeleteAll = (e) => {
    e.stopPropagation();
    setValue("");
    setDeleteAll(false);
    setShowOption(false);
    setOptions([]);
    setActiveOptions([]);
  }

  const handleActiveOption = (e, index, option) => {
    e.stopPropagation();
    setShowOption(true);
    if(options.length >= 0 ) {
      setDeleteAll(true);
    }
    if(activeOptions.includes(index)) {
      const updatedOptions = activeOptions.filter(
        (optionIndex) => optionIndex !== index
      );
      const updatedOptionsData = options.filter(
        (optionValue) => optionValue !== option
      );
      setOptions(updatedOptionsData);
      setActiveOptions(updatedOptions);
      setValue("");
      inputRef?.current?.focus();
      return;
    }
    setActiveOptions([...activeOptions, index]);
    setOptions([...options, option]);
    setOptionsDefault(arrOptions);
    setValue("");
    inputRef?.current?.focus();
  }

  const handleRemoveOptionValue = (e, option) => {
    e.stopPropagation();
    if(options.length === 1) {
      setDeleteAll(false);
    }
    const updatedOptionsData = options.filter(
      (optionValue) => optionValue !== option
    );
    const updatedOptions = activeOptions.filter(
      (optionIndex) => arrOptions[optionIndex].option !== option
    );
    setOptions(updatedOptionsData);
    setActiveOptions(updatedOptions);
    inputRef?.current?.focus();
  }


  return (
    <div style={{ position: "fixed", inset: "0" }} onClick={handleOut}>
      <div className={classes.selectBlock} onClick={handleOut}>
        <div className={classes.selectContainer}>
          <div
            className={`${classes.select} ${inputFocus ? classes.focus : ""}`}
            onMouseEnter={() => {
              if (options.length > 0) {
                setDeleteAll(true);
              }
            }}
            onMouseLeave={() => {
              setDeleteAll(false);
            }}
            onClick={(e) => {
              handleShowOption(e);
            }}
          >
            {options.length === 0 ? (
              <input
                type="text"
                className={classes.selectInput}
                placeholder="Please select"
                value={value}
                onChange={(e) => handleChangeInput(e)}
                autoFocus
              />
            ) : (
              <div className={classes.optionValueBlock}>
                {options.map((option, index) => (
                  <div className={classes.optionValue} key={index}>
                    <p>{option}</p>
                    <i
                      className={`fa-solid fa-xmark`}
                      style={{ color: "#878787", cursor: "pointer" }}
                      onClick={(e) => {
                        handleRemoveOptionValue(e, option);
                      }}
                    ></i>
                  </div>
                ))}
                <input
                  type="text"
                  className={classes.optionValueInput}
                  value={value}
                  size={value.length + 2}
                  onChange={(e) => handleChangeInput(e)}
                  ref={inputRef}
                  autoFocus
                />
              </div>
            )}

            {!deleteAll ? (
              !showOption ? (
                <i className={`${classes.icon} fa-solid fa-chevron-down`}></i>
              ) : (
                <i
                  className={`${classes.icon} fa-solid fa-magnifying-glass`}
                ></i>
              )
            ) : (
              <i
                className={`${classes.icon} fa-solid fa-circle-xmark`}
                onClick={(e) => {
                  handleDeleteAll(e);
                }}
              ></i>
            )}

            {showOption ? (
              <div className={classes.optionBlock}>
                {optionsDefault.map((option, index) => (
                  <div
                    className={`${classes.optionItem} ${
                      activeOptions.includes(option.id) ? classes.active : ""
                    }`}
                    key={index}
                    onClick={(e) => {
                      handleActiveOption(e, option.id, option.option);
                    }}
                  >
                    <p>{option.option}</p>
                    <i className={`${classes.iconCheck} fa-solid fa-check`}></i>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={classes.selectExp}>
            <div className={classes.optionValueBlock}>
              <div className={classes.optionValue}>
                <p>a10</p>
                <i
                  className={`fa-solid fa-xmark`}
                  style={{ color: "#878787", cursor: "pointer" }}
                ></i>
              </div>
              <div className={classes.optionValue}>
                <p>c12</p>
                <i
                  className={`fa-solid fa-xmark`}
                  style={{ color: "#878787", cursor: "pointer" }}
                ></i>
              </div>
            </div>

            <i
              className={`${classes.icon} fa-solid fa-chevron-down`}
              style={{ color: "#333" }}
            ></i>
          </div>

          <div className={classes.editBlock}>
            <div className={classes.separate}></div>
            <p className={classes.editGit}>
              multiple selection
              <a href="" target="_blank">
                <i
                  className={`${classes.iconLink} fa-regular fa-pen-to-square`}
                  title="Edit this demo on GitHub!"
                ></i>
              </a>
            </p>
          </div>

          <p style={{ marginTop: "70px" }}>
            Multiple selection, selecting from existing items.
          </p>

          <p style={{ border: "1px dashed #ccc", marginTop: "20px" }}></p>

          <div className={classes.iconBlock}>
            <a
              href="https://stackblitz.com/run?file=demo.tsx"
              title="Open in stackbliz"
              target="blank"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="thunderbolt"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z"></path>
              </svg>
            </a>
            <a
              href="https://codepen.io/pen?&editors=001&prefill_data_id=0b91d79f-cc2b-4c50-90ef-2bdb82823d39"
              target="blank"
            >
              <i
                className={`${classes.iconLink} fa-brands fa-codepen`}
                title="Open in Codepen"
              ></i>
            </a>
            <a
              href="https://codesandbox.io/s/rfp82s"
              target="blank"
              title="Open in CodeSandbox"
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                width="1em"
                height="1em"
              >
                <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"></path>
              </svg>
            </a>
            <a href="" target="blank" title="Open in new window">
              <svg
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M853.333 469.333A42.667 42.667 0 0 0 810.667 512v256A42.667 42.667 0 0 1 768 810.667H256A42.667 42.667 0 0 1 213.333 768V256A42.667 42.667 0 0 1 256 213.333h256A42.667 42.667 0 0 0 512 128H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V512a42.667 42.667 0 0 0-42.667-42.667z"></path>
                <path d="M682.667 213.333h67.413L481.707 481.28a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.586 0L810.667 273.92v67.413A42.667 42.667 0 0 0 853.333 384 42.667 42.667 0 0 0 896 341.333V170.667A42.667 42.667 0 0 0 853.333 128H682.667a42.667 42.667 0 0 0 0 85.333z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/DuyChinh/CloneAntDesign"
              target="blank"
              title="show code github"
            >
              <img
                alt="expand code"
                src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg"
                className="code-expand-icon-show"
                style={{ height: "20px", cursor: "pointer" }}
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectOption