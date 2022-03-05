import { Link } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ItemAdd = () => {
    const [name, setName] = useState("");
    const [] = useState("");
    const [value, setValue] = React.useState(null);

    return(
        <div>
        <h1 align="center" >ITEM ADD</h1>

        <form
            className="auth-form"
            method="POST"
            onSubmit={ItemAdd}
            autoComplete={"off"}
            >
            <div>
                <text>Item Name : </text>
                <input 
                align = "right"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <br/><br/>
            <div>
                <text>Created Date : </text>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Created Date"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
            <br/><br/>
            <div>
                <text>Expiry Date : </text>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Expiry Date"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
            <br/><br/>

            <div>
                <button>
                    <Link to="/added"> 
                    ADD
                    </Link>
                </button>
            </div>
        </form>


<br/><br/><br/><br/><br/><br/><br/>
        <button>
            <Link to={'/item-summary'}>
                Click to Item Summary
            </Link>
            
        </button>
        <button>
            <Link to={'/'}>
                LogOut
            </Link>
        </button>
        </div>
    )
    }
      
    export default ItemAdd;