import React, { useEffect, useState } from "react";

const Nav = ({ toggle, setToggle }) => {
  return (
    <header className="header">
      <button className="toggle-btn" onClick={() => setToggle(!toggle)}>
        {toggle  ? "Show in Table" : "Show in Card"}
      </button>
    </header>
  );
};

const Card = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtF3o2PvqxOMHgdrpj_YRItsLBjxyTeNZu_Q&usqp=CAU"
          alt="user-avtar"
        />
        <span className="user-name">{user.name}</span>
        <span className="user-occupation">{user.occupation}</span>
        <span className="user-age">{user.age}</span>
      </div>
    </div>
  );
};

const Table = ({data}) => {
  return (
    <div className="table-container">
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Occupation</th>
        </tr>
        {data.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.occupation}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loding, setLoding] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterValue, setfilterValue] = useState("name");

  const getUser = async () => {
    try {
      setLoding(true);
      const res = await fetch("https://coralmango.com/api/react-test");
      const data = await res.json();
      setUserData(data);
      setLoding(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const filterUser = () => {
    return userData.filter((user) => user.name.toLowerCase().includes(inputValue) || user.age === inputValue);
  }

  const filterTable = (e) => {
    setfilterValue(e.target.value)
    if(filterValue === "age"){
      const numAscending = [...userData].sort((a, b) => a.age - b.age);
      setUserData(numAscending);    
    }
    if(filterValue === "name") {
      const strAscending = [...userData].sort((a, b) => a.name > b.name ? 1 : -1);
      setUserData(strAscending);
    }
  }


  return (
    <>
      <Nav toggle={toggle} setToggle={setToggle} />
      <div className="container">
        <div className="filter-container">
        <div className="radio-btns">
          <small style={{marginRight: "1rem"}}>Sort</small>
           <select className="filter-option" onChange={(e) => filterTable(e)}>
            <option value="" selected>--select--</option>
            <option value="name">By Age</option>
            <option value="age"> By Name</option>
           </select>
        </div>
          {
            inputValue.length > 0 ? <div className="filter-view-message">You Are viewing filtered results!</div> : ""

          }

        </div>
        <div className="search_container">
          <input type="search" value={inputValue} placeholder="Enter name or age" onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        {loding ? <p>Loding....</p> : 
          <div className="user-container">
            {!toggle ? <Table data={filterUser(userData)}/> : filterUser(userData).map((user , index) => <Card user={user} key={index}/>)}
          </div>
        }
      </div>
    </>
  );
};

export default Users;
