import "./TreeChild.css";
import { useState } from "react";
import TreeDisplay from "../TreeRender/TreeRender";
const TreeChild = ({ item, handleData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    handleData(item);
  };
  const handleActive = () => {
    handleData(item);
  };
  return (
    <>
      <div className="tree">
        <div className="actions">
          {item.children.length ? (
            <div className="btn btn-caret" onClick={() => setIsOpen(!isOpen)} style={{marginLeft: "-24px"}}>
              <i
                className={`fa-solid fa-caret-right ${isOpen ? "open" : ""}`}
              ></i>
            </div>
          ) : (
            ""
          )}
          <div
            className={`btn btn-checkbox ${
              item.checked === "pending"
                ? item.checked
                : item.checked
                ? "checked"
                : ""
            }`}
            onClick={handleClick}
          >
            {item.checked === "pending" ? (
              <i className="fa-solid fa-stop"></i>
            ) : item.checked ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={`title ${item.active ? "active" : ""}`}>
          {item.title}
        </div>
      </div>

      <div className={`tree-wrapper ${isOpen ? "show" : ""}`}>
        {item.children.length ? (
          <TreeDisplay data={item.children} handleData={handleData} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TreeChild;
