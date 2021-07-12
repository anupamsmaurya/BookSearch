import { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { fetchBooks } from "../../store/actions";
import { useAppDispatch } from "../../types/typeDefinitions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: 'center',
        padding: 10
    },
    input: {
        width: 400,
        minHeight: 31,
        marginRight: 10
    },
});

const SearchInput = () => {

    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitSearch();
        }
    }

    const submitSearch = () => {
        dispatch(fetchBooks({
            filters: [{ type: "all", values: value.split(" ") }],
            page: 1
        }));
    }

    return (
        <Paper className={classes.root}>
            <input 
                className={classes.input} 
                value={value} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown} 
                placeholder="Enter search term"                
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={submitSearch}
            >
                Search
            </Button>
        </Paper>
    );
}

export default SearchInput;