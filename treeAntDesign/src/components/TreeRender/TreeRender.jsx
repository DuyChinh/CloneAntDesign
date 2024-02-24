import TreeChild from "../TreeChild/TreeChild";
import { memo } from "react";
const TreeRender = ({ handleData, data }) => {
  return (
    <div className="tree-render" style={{marginLeft: "4rem"}}>
      {data.map((item, index) => (
        <TreeChild key={index} item={item} handleData={handleData} />
      ))}
    </div>
  );
};

export default memo(TreeRender);
