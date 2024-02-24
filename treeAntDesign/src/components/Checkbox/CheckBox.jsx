import "./CheckBox.css"
import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import TreeRender from "../TreeRender/TreeRender";
import treeData from "../../store/TreeData";
import get from "../utils/GetData";
const Checkbox = () => {
  const [data, setData] = useState([]);
  const [treeDb, setTreeDb] = useRecoilState(treeData);
  const dataRoot = get(treeDb);

  useEffect(() => {
    const handleData = (parentId = null) => {
      const db = dataRoot.filter((item) => {
        let arr = [];
        if (item.parentId === parentId) {
          dataRoot.map((i) => {
            if (i.parentId === item.id) {
              arr.push(i);
            }
            return i;
          });
          item.children = arr;
          handleData(item.id);
        }
        return item.parentId === parentId;
      });
      return db;
    };
    const db = handleData();
    setData(db);
  }, [treeDb]);

  const handleChecked = (item) => {
    item.checked = !item.checked;
    if (item?.children.length) {
      item?.children?.map((i) => {
        i.checked = !item.checked;
        handleChecked(i);
      });
    }

    const db = dataRoot.map((child) => {
      if (child.id === item.id) {
        child.checked = item.checked;
      }
      return child;
    });

    checkPending(item);
    return db;
  };

  const checkPending = (item) => {
    const childArr = dataRoot.filter((child) => {
      if (child.parentId === item?.parentId) {
        return child;
      }
    });
    const check = childArr.every((i) => i.checked === item.checked);
    if (check) {
      dataRoot.map((i) => {
        if (i.id === item?.parentId) {
          i.checked = item.checked;
          checkPending(i);
        }
        return i;
      });
    } else {
      dataRoot.map((i) => {
        if (i.id === item?.parentId) {
          i.checked = "pending";
          checkPending(i);
        }
        return i;
      });
    }
  };

  const getData = useCallback((value) => {
    const cloneValue = get(value);
    const newDb = handleChecked(cloneValue);
    setTreeDb(newDb);
  });

  return (
    <div className="container">
      <TreeRender handleData={getData} data={data} />
    </div>
  );
};

export default Checkbox;
