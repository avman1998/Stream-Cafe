export const DATA_API = "AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs";
export const burgerStyle = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "10px",
    top: "15px",
  },
  bmBurgerBars: {
    background: "White",
  },
  bmBurgerBarsHover: {
    background: "#13B8F2",
  },
  bmCrossButton: {
    height: "35px",
    width: "35px",
  },
  bmCross: {
    background: "White",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0px",
    left: "0px",
  },
  bmMenu: {
    background: "#21354e",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "White",
    padding: "0.8em",
  },
  bmItem: {
    display: "flex",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0)",
  },
};
export function removeDuplicates(arr) {
  // Declare a new array
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};

  // Loop for the array elements
  for (let i in arr) {
    // Extract the title
    let objTitle = arr[i]["id"];

    // Use the title as the index
    uniqueObject[objTitle] = arr[i];
  }

  // Loop to push unique object into array
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  // Return newArray
  return newArray;
}
