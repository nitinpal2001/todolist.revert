import React, { useState, useEffect } from "react";
import "../index.css";

// Importing Completed Status icon
import completed from '../Assets/completed.svg'


// getting local Storage data 
const Todolist = () => {
  const getLocalData = () => {
    const lists = localStorage.getItem("listItems");
    if (lists) {
      return JSON.parse(lists);
    }
    else return [];
  }

  //Declaring the state
  const [inputData, setInputData] = useState("")
  const [itemList, setItemList] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleBtn, setToggleBtn] = useState(false)

  //Updating the local storage data
  useEffect(() => {
    localStorage.setItem('listItems', JSON.stringify(itemList))
  }, [itemList])

  // Editing Items in the list
  const edititem = (id) => {
    const item_to_edit = itemList.find((element) => {
      return element.id === id;
    })
    setInputData(item_to_edit.name);
    setToggleBtn(true);
    setIsEditItem(item_to_edit.id)
  }
  
  // Adding Items to the List
  const addItem = () => {
    if (!inputData) {
      alert('Please Add Any Task')
    }
    else if (inputData && toggleBtn) {
      setItemList(
        itemList.map((element) => {
          if (element.id === isEditItem) {
            return { ...itemList, name: inputData}
          }
          else return element;
        })
      )
      setToggleBtn(false);
      setInputData("");
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        isCompleted: false
      };
      setItemList([...itemList, newInputData])
      setInputData("")
      console.log(setInputData);
    }

  };

  // Deleting the Items
  const deleteItem = (id) => {
    setItemList(itemList.filter((element) => { return element.id !== id }))
    return;
  }

  // Toggleing the Completed Status
  const toggleCompleted = (id) => {
    setItemList(
      itemList.map((element) => {
        if (element.id === id) {
          return { ...element, isCompleted: !element.isCompleted }
        }
        else return element;
      }
      )
    )
  }


  return (
    <>
      <div className="main-div">
        <h1>To-Do List</h1>
        <div className="child-div">
          <h2>Add a New Task In The List</h2>
          <div className="addItems">
            <input
              type="text"
              placeholder="Enter the task here"
              autoFocus
              className="form-control enterkey"
              value={inputData}
              onChange={(event) => { setInputData(event.target.value) }}
            />
            {toggleBtn? <button className="btn btn-primary" onClick={addItem}>Edit</button>:<button className="btn btn-primary" onClick={addItem}>Submit</button>}
          </div>
          <h2>Added task in to-do list</h2>

          {/* show our items  */}
          <div className="showItems">
            {itemList.map((element, index) => {
              return (
                <>
                  <div className="eachItem" key={element.id}>
                    <div className="taskindex">{index + 1}. </div>
                    <div className="taskcard" style={{backgroundColor:`${element.isCompleted ? "#202020":"#2f2f2f"}`}}>
                  {element.isCompleted && <img src={completed} alt="Done" />}
                      <div className="card-upper">Task {index + 1}:  {element.name}</div>
                      <hr style={{ width: "100%", margin: "1em 0em" }} />
                      <div className="card-bottom">
                        <button className="btn btn-primary" onClick={() => { toggleCompleted(element.id) }}>Mark as Completed</button>
                        <h3 className="" onClick={() => edititem(element.id)}>Edit</h3>
                        <h3 className="" onClick={() => deleteItem(element.id)}>Delete</h3>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;