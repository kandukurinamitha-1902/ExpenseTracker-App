import { useEffect, useState } from 'react';
import './ExpenseTracker.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const ExpenseTracker = ({trackData, setTrackData}) => {
    //sequentioal oreder in function 
    // 1) props
    //2)useEffect
    //functions
    // is used to hide the fields binded to  add transaction button.
    const [showDiv, setShowDiv] = useState(true);
    //Validation code  js
    const [formData, setFormData] = useState({
        amount: 0,
        name: "",
        isBudget: false,
        id:0,
        expense: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
        //below variable is for total budget or amount called in balance or budget.                  line no 141.
    const [budget, setBudget] = useState();
        //below variable is for total expense called in expense.                 
    const [expense, setExpense] = useState();
    const [balance, setBalance] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    //•It will load the data in components.(when we load the page first useEffect component will call.)
    useEffect (() =>{
        getTotalBudget();
        setFilteredData(trackData);
    }, [trackData]);
    //code for expense
    const getTotalBudget = () =>{
        let totalBudget = 0;
        let totalExpense = 0;
        //inplace of data we can take anything.
       for(const data of trackData) {
            console.log(data.isBudget);
            if(data.isBudget === true){
                totalBudget += data.amount;
            }
            else if(data.isBudget === false){
                 totalExpense += data.amount;
            } 
         };
        console.log(totalBudget);
        setBudget(totalBudget); 
        setExpense(totalExpense); 
        setBalance(totalBudget-totalExpense);  
    }
// handelChange is used in each field of form.
    const handleChange = (s) => {
        setFormData({
            ...formData, 
                // (...) used to add data in the set form.
            [s.target.name]: s.target.value,
                // (e = event emitter) used to assign respective values to the key.
        });
    };
// form validation
    const validation = () => {
        let newErrors = {};
        // amount Validation.
        if (!formData.amount) {
            newErrors.amount = "Amount Is Required";
        }
        // name Validation.
        if (!formData. name) {
            newErrors.name = "Expense or Budget Is Required";
        }
         //expense or budget validation.
        if (!formData.expense) {
            newErrors.expense = "Select Expense or Budget";
        }
        return newErrors;
    }
    // Submit (POST API)
    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log("trackData");
        const validationErrors = validation();
        console.log("ValidationErrors" + Object.keys(validationErrors).length);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;    // when we have errors return keyword (is very imp) will send them back to validate method, if we wont use return keyword then it will go to next step.
        }
        try {
            formData.id = trackData.length + 1;
            formData.isBudget =  formData.expense === 'Budget' ? true : false;
            formData.amount = Number(formData.amount);
            setTrackData([...trackData, formData]);
            setSuccess("added ✅");
            setErrors({});
            setFormData({ id: 0, amount:0, name: "", isBudget:false});
            
            console.log(trackData);
            getTotalBudget();
            setShowDiv(!showDiv);
        }
         catch (error) {
            console.error("Error:", error);
        }
    };
    // functionality for search.
    const filteredTrackData = () => {
        console.log(searchTerm);
        console.log(filteredData);
        if (searchTerm === "") {
            // Show all records
            setFilteredData(trackData);
        } else {
            const searchedTrackData = trackData.filter((track) =>
                track.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
             setFilteredData(searchedTrackData);
        }
    }
    
//deleteItem functionality.
     function deleteItem(id) {
        const updatedItems = trackData.filter(track => track.id !== id);
        setTrackData(updatedItems);
    };
return(
    <div class= "expenseTracker">
        <div className = "header">
            <h1>Expense Tracker</h1>
        </div>
        <div class= "container">
            <h1>Balance: ₹{balance}</h1>
            <div class="button">
                <button type="button" class="btn btn-success"onClick={() => setShowDiv(!showDiv)}>
                    {showDiv ? "Hide" : "Add Transaction"}
                    </button>
            </div>      
        </div>
        <form action="" onSubmit={handleSubmit}>
            {showDiv && (<div style={{padding: "20px"}}>
                <div className='block1'>
                    <input class="form-control" 
                    type="number" 
                    placeholder="Amount" 
                    name = "amount"
                    aria-label="default input example" 
                    style={{marginBottom: "20px"}}
                    value={formData.amount}
                    onChange={handleChange} />
                    {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
                    
                    <input class="form-control" 
                    type="text" 
                    placeholder="Expense Name" 
                    name="name"
                    aria-label="default input example" 
                    class="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            
                    <RadioGroup name="row-radio-buttons-group" >
                        <div className='radioButton'> 
                            <FormControlLabel  
                            value="Expense" 
                            control={<Radio />} 
                            label="Expense"
                            type="radio"
                            name='expense'
                            checked={formData.expense === "Expense"}
                            onChange={handleChange}
                             />
                            <FormControlLabel 
                            value="Budget" 
                            control={<Radio />} 
                            label="Budget"
                            type="radio"
                            name='expense'
                            checked={formData.expense === "Budget"}
                            onChange={handleChange}
                            />
                        {errors.expense && <p style={{ color: "red" }}>{errors.expense}</p>}
                        </div>
                        <button type="submit" class="btn btn-success" style={{width: "170px", marginLeft: "40%" }} >{showDiv ? "Add Transaction" : "Add Transaction"}</button>
                    </RadioGroup>
                </div>

            </div>
            )}
        </form>
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 },gap: '10%'}}  >
                <div                     style= {{width: "1000px", marginTop: "20px", border: "1px solid black", color: "red"}} >
                <label htmlFor="">Expense</label>
                <h1 className='block2'
                    id="demo-helper-text-aligned"
                    label="Expense"
                 >₹{expense}</h1>
                    </div>
                    <div                     style= {{width: "1000px", marginTop: "20px",  border: "1px solid black", color: "green"}}>
                    <label htmlFor="">Budget</label>
                     <h1 className='block2'
                    id="demo-helper-text-aligned"
                    label="Expense"
                    >₹{budget}</h1>
                    </div>
            </Box>
        </div>
        <h1>Transactions</h1>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <div class="d-flex" role="search" >
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={searchTerm} style={{border: "3px solid black"}} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button class="btn btn-outline-success" type="submit" style={{padding: "10px", border: "3px solid black"  }} onClick={()=>filteredTrackData()}>Search</button>
                </div>
            </div>
        </nav>
            <Box sx={{ flexGrow: 1 }} className= "container2">
                {filteredData.map((track) => (
                <Grid container spacing={2} className= "container2Block1" >
                    <Grid size={2}>
                        <div>{track.id}</div>
                    </Grid>
                    <Grid size={6}>
                        <div>{track.name}</div>
                    </Grid>
                    <Grid size={2}>
                        <div>₹{track.amount}</div>
                    </Grid>
                    <Grid size={2}>
                        <button type="submit" class="btn btn-danger" onClick={() => deleteItem(track.id)}>Remove</button>
                    </Grid>
                </Grid>
                 ))}; 
            </Box>
    </div>
)
}; export default ExpenseTracker


