import { BookType, FilterType, useAppDispatch, useAppSelector } from "../../types/typeDefinitions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchBooks } from "../../store/actions";
import Loader from "../loader";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import getQueryParamFromURL from "../../utils/urlHelper";


interface Column {
    id: 'title' | 'author' | 'pages' | 'city' | 'country' | 'year';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'author', label: 'Author', minWidth: 100 },
    { id: 'pages', label: 'Pages', minWidth: 170 },
    { id: 'city', label: 'City', minWidth: 170 },
    { id: 'country', label: 'Country', minWidth: 170 },
    { id: 'year', label: 'Year', minWidth: 100 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'relative'
    },
    container: {
        maxHeight: 600,
    },
});

const BookList: React.FC = () => {

    const { booksList, totalCount, page, itemsPerPage, isLoading } = useAppSelector((state) => ({ ...state }))
    const dispatch = useAppDispatch()
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();


    useEffect(() => {
        const initialPageNumber = Number(getQueryParamFromURL(location.search, 'page')) || 1;
        dispatch(fetchBooks({
            page: initialPageNumber
        }));
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(fetchBooks({
            page: newPage + 1
        }));
        history.push(`${location.pathname}?page=${newPage + 1}`);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(fetchBooks({
            page: 1,
            itemsPerPage: parseInt(event.target.value, 10)
        }));
        history.push(`${location.pathname}?page=1`);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <Header />
                    <TableBody>
                        {
                            booksList.map((book: BookType, index: number) => {
                                return (
                                    <TableRow key={book.id} data-testid={index}>
                                        <TableCell>{book.book_title}</TableCell>
                                        <TableCell>{book.book_author}</TableCell>
                                        <TableCell>{book.book_pages}</TableCell>
                                        <TableCell>{book.book_publication_city}</TableCell>
                                        <TableCell>{book.book_publication_country}</TableCell>
                                        <TableCell>{book.book_publication_year}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={itemsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {isLoading && <Loader />}
        </Paper>
    );
}

const Header = () => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default BookList;