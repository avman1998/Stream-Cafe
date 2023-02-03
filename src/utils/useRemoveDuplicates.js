export function useRemoveDuplicates(arr) {
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
