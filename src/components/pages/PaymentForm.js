import React, { useState } from 'react';
import { Label } from './FormFields';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './../common.scss';



function PaymentForm(props) {

    const [entryMode, setEntrymode] = useState('');
    const [avlSeats, setAvlSeats] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [ticketCategory, setTicketCategory] = useState([]);
    
    // TO BE INSERTED INTO TICKET CATEGORY ARRAY
    const [seats, setSeats] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    
    const handleChange = (event) => {
        setEntrymode(event.target.value);  
    };

    const saveCategory = () => {
        let data = {
            id: new Date().getTime(), seats, category, amount, description
        }
        setTicketCategory(oldArray => [...oldArray, data]);

        setIsOpen(false);
        setAmount('');
        setCategory([]);
        setSeats('');
        setDescription('');
        console.log(ticketCategory)
    }

    const clickEventBtn = () => {
        const data = {
            entryMode,
            // seats,
            // amount,
            currency: 'INR',
            ticketCategory,
            avlSeats
        }
        props.onclick(data);
    }

    return (
        <div>
            <h1 style={{fontSize: 17, fontWeight: 600}}>Setup tickets and seats</h1>
            <div className="form-input-container">
                <Label 
                    label="Ticketing Method" 
                    isRequired={true} 
                />
                <RadioGroup aria-label="ticketing" name="paid" value={entryMode} onChange={handleChange} className="radiogroup">
                    <FormControlLabel value="free" control={<Radio color="default"/>} label="Free Entry" />
                    <FormControlLabel value="paid" control={<Radio color="default"/>} label="Paid Entry" />
                </RadioGroup>
            </div>  

            {ticketCategory.length>0 &&
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Seats</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {ticketCategory.map((row) => (
                            <TableRow key={row.category}>
                                <TableCell component="th" scope="row">
                                    {row.category}
                                </TableCell>
                                <TableCell align="right">{row.seats}</TableCell>
                                <TableCell align="right">₹ {row.amount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }


            {entryMode === 'free' && 
                <div className="form-input-container">
                    <Label 
                        label="How many seats are available?" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Ex. 100" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={avlSeats}
                        onChange={(e)=> setAvlSeats(e.target.value)} 
                    />
                </div>  
            }

            {isOpen && 
            <div>
                <div className="form-input-container">
                    <Label 
                        label="Enter ticket category?" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="ex. Silver, Gold, Diamond" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)} 
                    />
                </div>  
                <div className="form-input-container">
                    <Label 
                        label="Ticket Amount?" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter ticket amount" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={amount}
                        onChange={(e)=> setAmount(e.target.value)} 
                    />
                </div>  
                <div className="form-input-container">
                    <Label 
                        label="How many Seats are available?" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter total seats/ticket are available" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={seats}
                        onChange={(e)=> setSeats(e.target.value)} 
                    />
                </div>  
                <div className="form-input-container">
                    <Label 
                        label="Write some description (Optional)" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Ex. No outside foods allowed" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)} 
                    />
                </div>  
            </div>}

            {entryMode === 'paid' &&
            <div style={{margin: '20px 0'}}>
                {!isOpen ? <span className="add-category" onClick={() => setIsOpen(true)}><AddIcon/>Add ticket category</span> :
                 <button type="button" className="save-category" onClick={() => saveCategory()}>Save</button>}
            </div>}

            {entryMode !== '' &&
            <button type="button" className="continue-btn" onClick={()=> clickEventBtn()} >
                <span>Publish Event</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{fill: '#fff', width: 18}} viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>

            </button>}
        </div>
    )
}


export default PaymentForm;