import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

//let items = ["City A", "City B", "City C", "City D", "City E"];
//items = [];
//const checkItemsEmpty = items.length === 0 ? <p>No items found</p> : null;

const checkItemsEmpty = ({ items }: Props) => {
  return items.length === 0 && <p>No items found</p>;
};

//function handleClickElement(index) {
//    return (index) => console.log(item, index);
//}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //let functionHandleClickElement = (event: MouseEvent,item: string, index: number) => console.log(event,item, index);
  //let selectedIndex = -1;
  //let functionHandleClickElement = (event: MouseEvent) => console.log(event);

  // Hook (Saves states such as selectedIndex)
  // const [variable, updaterfunction] = useState(init value of variable)
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {checkItemsEmpty({ items, heading, onSelectItem })}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            //onClick={functionHandleClickElement}
            //onClick={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
