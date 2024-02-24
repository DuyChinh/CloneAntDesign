import { atom } from "recoil";

export const data = [
  {
    title: "tieu de 0",
    id: 0,
    parentId: null,
  },
  {
    title: "tieu de 1",
    id: 1,
    parentId: null,
  },
  {
    title: "tieu de 1.0",
    id: 2,
    parentId: 1,
  },
  {
    title: "tieu de 1.1",
    id: 3,
    parentId: 1,
  },
  {
    title: "tieu de 1.2",
    id: 4,
    parentId: 1,
  },
  {
    title: "tieu de 1.2.0",
    id: 7,
    parentId: 4,
  },
  {
    title: "tieu de 3",
    id: 11,
    parentId: null,
  },
  {
    title: "tieu de 3.1.1",
    id: 14,
    parentId: 13,
  },
  {
    title: "tieu de 1.2.1",
    id: 8,
    parentId: 4,
  },
  {
    title: "tieu de 1.2.2",
    id: 9,
    parentId: 4,
  },
  {
    title: "tieu de 0.1",
    id: 5,
    parentId: 0,
  },
  {
    title: "tieu de 0.2",
    id: 6,
    parentId: 0,
  },
  {
    title: "tieu de 2",
    id: 10,
    parentId: null,
  },
  {
    title: "tieu de 3.1",
    id: 13,
    parentId: 11,
  },
  {
    title: "tieu de 2.1",
    id: 12,
    parentId: 10,
  },
  {
    title: "tieu de 1.2.2.0",
    id: 15,
    parentId: 9,
  },
];
const dataUse = data.map((i) => {
  i.checked = false;
  i.active = false;
  return i;
});

const treeData = atom({
  key: "treeData",
  default: dataUse,
});
export default treeData;
