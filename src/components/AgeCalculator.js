import {useState}from "react";

import './AgeCalculator.css';

export default function AgeCalculator(){
    const [birthDate, setBirthDate] = useState("");
    const [age, setAge] = useState("");

    const calculateAge = () => {
        const currentDate = new Date();
        const selectedDate = new Date(birthDate);

        if (selectedDate > currentDate){
            setAge("invalid");
            return;
        }

        
        if (!isNaN(currentDate) && !isNaN(selectedDate)){
            let yearDiff = currentDate.getFullYear() - selectedDate.getFullYear();
            let monthDiff = currentDate.getMonth() - selectedDate.getMonth();
            let dayDiff = currentDate.getDate() - selectedDate.getDate();

            if (yearDiff === 0 && monthDiff === 0 && dayDiff === 0){
                setAge("0. Happy Birthday!");
                return;
            }

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
                yearDiff--;
                monthDiff += 12;
                if (dayDiff < 0){
                    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
                    dayDiff = prevMonth + dayDiff;
                    monthDiff--;
                }
            }

            let difference = "";
            if(yearDiff > 0){
                difference += `${yearDiff} year${yearDiff > 1 ? "s ":" "}`;
            }
            if(monthDiff > 0){
                difference += `${monthDiff} month${monthDiff > 1 ? "s ":" "}`;
            }
            if(dayDiff > 0){
                difference += `${dayDiff} day${dayDiff > 1 ? "s ":" "}`;
            }
            setAge(difference);
        }
        else{
            setAge("");
        }
    };
    return(
        <div className="container">
            <h1>Age Calculator</h1>
            <label htmlFor = "birthDate">Enter your date of birth</label>
            <br/>
            <input 
            type = "date" id = "birthDate" value = {birthDate}
            onChange = {(e) => setBirthDate(e.target.value)}></input>
            <br/>
            <button onClick = {calculateAge}>Calculate Age</button>
            <br/>
            {age && <h3>{`You are ${age} old`}</h3>}
        </div>
    );
}