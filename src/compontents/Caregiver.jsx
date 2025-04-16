import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

function Caregiver() {

  const navigate =useNavigate();


  const subjects = [
  {index:1,subject:"subjectk-1"},
  {index:2,subject:"subjectk-2"},
  {index:3,subject:"subjectk-3"},
  {index:4,subject:"subjectk-4"},
  {index:5,subject:"subjectk-5"},
  {index:6,subject:"subjectk-6"},

  ];



   const navigateMemo =(subject) =>{
    navigate(`/memolistkaigo?subject=${encodeURIComponent(subject)}`);
   }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh", 
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <h2 style={{ color: "#5869CC", fontSize: "32px", marginBottom: "40px" }}>
      介護　-　科目
      </h2>

      <div
        style={{
          width: "700px",
          background: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
          padding: "40px 20px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {subjects.map((item,index) => (
          <div
            key={index}
           
            onClick={() => navigateMemo(item.subject) } 

            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                width: "21px",
                height: "22px",
                backgroundColor: "#5869CC",
              }}
            />
            {item.subject}
          </div>
        ))}
      </div>
    </div>
  );
}

    export default Caregiver;
    