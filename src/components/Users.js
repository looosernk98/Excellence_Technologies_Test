import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const columns = [
  { id: 'id', label: 'ID', minWidth: 80, },
  {
    id: 'first_name',
    label: 'First Name',
    minWidth: 150,
    align: 'left',
    background:'lightgreen'
  },
  {
    id: 'last_name',
    label: 'Last Name',
    minWidth: 150,
    align: 'left',
    background:'lightgreen'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'left',
    background:'lightgreen'
  },
  {
    id: 'avatar',
    label: 'Avatar',
    minWidth: 50,
    background:'lightgreen'
  },
];

const useStyles = makeStyles({
  root: {
    marginLeft: '100px',
    marginRight: '100px',
    marginBottom: '25px',
    borderRadius:'8px'
  },
  container: {
    maxHeight: 440,
    borderRadius:'8px'
  },
});

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  
  useEffect(() => {
     
      async function fetchData(){

         let api1 = await axios.get("https://reqres.in/api/users?page=1");
         let api2 = await axios.get("https://reqres.in/api/users?page=2");

          let response = await axios.all([api1, api2]).then(
             await axios.spread((...allData)=>{
              let res = [];

              res.push(allData[0].data.data);
              res.push(allData[1].data.data);
              return res;
            })

          ).catch(e => console.log(e));
        
          let userData =[];

          for(let i=0; i<response.length; i++){
             for(let j=0; j<response[i].length; j++){
               userData.push(response[i][j]);
             }
          }

          setUsers(userData);
          
      }
     
      fetchData();

  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow style={{background:'blue'}}>
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
          <TableBody>
            {users && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => {
                    const value = (column.id ==="avatar") ? <img height='25px' width='60px' alt="avatar" src={user[column.id]}/> : user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6,12]}
        component="div"
        count={users && users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
