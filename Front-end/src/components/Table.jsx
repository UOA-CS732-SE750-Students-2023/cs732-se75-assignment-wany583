import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import {IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadIcon from '@mui/icons-material/Upload';
import { TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useState , useEffect } from 'react';
import Header from './Header';
import { apiPost, apiGet } from './Service';
import AddIcon from '@mui/icons-material/Add'
import ExportExcel from './ExportExcel';

const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (b[orderBy] === a[orderBy]) {
      return 0;
    } else if (a[orderBy] == null || a[orderBy] === "") {
      return 1;
    } else if (b[orderBy] == null || b[orderBy] === "") {
      return -1;
    } else if (orderBy === "price") {
      if (order === "asc") {
        return parseInt(a[orderBy], 10) < parseInt(b[orderBy], 10) ? -1 : 1
      } else {
        return parseInt(b[orderBy], 10) > parseInt(a[orderBy], 10) ? 1 : -1
      }
    } else if (order === "asc" && orderBy !== "price") {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? -1 : 1;
    } else {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? 1 : -1;
    }
  }
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: true,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: true,
    label: 'Price($)',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={"check-box"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right" padding={"check-box"}>
            Product Image
          </TableCell>
          <TableCell align="right" padding={"check-box"}>
            Action
          </TableCell>
      </TableRow>
    </TableHead>
  );
}

// Main function
export default function EnhancedTable({ data, message, setMessage }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [edit, setEdit] = useState('');
  const [dialogStatus,setDialogStatus] = useState(false);
  const [dialog, setDialog] = useState({})
  const [selectedFile, setSelectedFile] = useState()
  const [picture, setPicture] = useState(null)
  const [preview, setPreview] = useState()
  const [tableCellEdit, setTableCellEdit] = useState({})
  const [products, setProducts] = useState([]);
  const [searchedValue, setSearchedValue] = useState('')
  let formData = new FormData()
  const [newProduct, setNewProduct] = useState({})
  const [onAddNew, setOnAddNew] = useState(false)



    // Retrieve product
      useEffect(() => {
        setPage(0)
        setProducts(data.filter(product => {
          if (searchedValue === '') {
            return product;
          } else if (product.title && searchedValue && product.title.toLowerCase().includes(searchedValue.toLowerCase())) {
            return product;
          } else if (product.description && searchedValue && product.description.toLowerCase().includes(searchedValue.toLowerCase())) {
            return product;
          }
        }))
      }, [searchedValue, data])

      // create the picture to URL of user uploading Image in preview
      useEffect(() => {
        if (!selectedFile) {
          setPreview(undefined)
          return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
      }, [selectedFile])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  //Show the delete pop-ups
  const handleClickOpen = prop => {
    setDialogStatus(true);
    setDialog(prop)
  }

  //Close the delete pop-ups
  const handleClose = () => {
    setDialogStatus(false);
  }


  // Get the response of updated data
  const handleChange = e => {
    setTableCellEdit({ ...tableCellEdit, [e.target.name]: e.target.value })
  }

  // Get the response of new data
  const handleAddNew = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }


  // Create new data info
  const createProduct = (data) => {
    setOnAddNew(!onAddNew)
    console.log(data.productImage)
    const dataToSubmit = {
      title: data.title,
      description: data.description,
      price: data.price,
      categoryId: 1,
      isActive:1,
      productImage:data.productImage
    };

    apiPost('product/add', dataToSubmit).then(res => {
      setProducts([{
        title: data.title,
        description: data.description,
        price: data.price,
        productImage:data.productImage
      }, ...products])
      setEdit('')
      setPicture('')
      setPage(0)
      res.data ? setMessage('createdNew') : setMessage('notCreatedNew')
    })
  }

  // Delete
  const onDelete = (id) => {
    const token = localStorage.getItem('token')
    const dataToDelete = {
      id:id,
      token:token
    };
    apiPost('product/delete',dataToDelete).then(res => {
      res.data && setProducts(products.filter((product) => product.id !== id))
      res.data ? setMessage('delete-success') : setMessage('delete-unsuccess')
    })
  }

  // Update
  const handleData = (data) => {
    const dataToChange = {
      id:data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      categoryId: 1,
      isActive:1,
      productImage:data.productImage
    };
      apiPost('product/update', dataToChange).then(res => {
        setEdit('')
        apiGet(`product/list`).then(res => setProducts(res.data.result)).catch(err => console.log(err))
        setPicture('')
        res.data ? setMessage('updated') : setMessage('notUpdated')
      })
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  return (
    <>
    <Header setSearchedValue={setSearchedValue} message={message} setMessage={setMessage}/>
    <Box sx={{ mt: 2, maxWidth: { xs: 450, sm: 550, md: 1050, xl: 1450 }, ml: "auto", mr: "auto"}}>

      {/* "add" button */}
    <Box sx={{ fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex' }} ><p>Add New</p><IconButton variant="outlined" onClick={() => setOnAddNew(true)} sx={{ px: 1.5 }}><AddIcon /></IconButton></Box>
            <Box sx={{ display: { xs: "flex" } }} >
            </Box>

      {/* Excel */}
    <Box sx={{ display: { xs: "flex" } }} >
              <ExportExcel Products={products} setMessage={setMessage} />
            </Box>
      </Box>

      <Paper sx={{ mt: 3, width: '100%', overflow: 'hidden' }}>
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <TableBody>

              {/* Add a new row */}
              {onAddNew &&
            <TableRow >
      <TableCell component="th" scope="row">
        <TextField
          name='title'
          onChange={e => {
            handleAddNew(e)
          }}
        />
      </TableCell>
      <TableCell align="right" >
        <TextField
          name='description'
          onChange={e => {
            handleAddNew(e)
          }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type='number'
          name='price'
          InputProps={{ inputProps: { min: 0 } }}
          onChange={e => {
            handleAddNew(e)
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "inline-block",
            position: 'relative',
          }}>
          <Box sx={{
            display: "flex"
          }}>
            <Box>
            <TextField
              type='string'
              name='productImage'
              InputProps={{ inputProps: { min: 0 } }}
              onChange={e => {
                handleAddNew(e)
              }}
                />
              {/* <IconButton component="label" htmlFor="addNew-file"><UploadIcon /></IconButton>
              <input hidden name="productImage" accept="image/*" id="addNew-file" multiple type="file" onChange={(e) => {
                setSelectedFile(e.target.files[0])
                setPicture(e.target.files[0])
              }} /> */}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",

        }}>
          <IconButton
            disabled={!newProduct.title || !newProduct.description || !newProduct.price}
            variant="outlined"
            size="medium"
            onClick={() => {
              createProduct(newProduct)
              setPreview(undefined)
            }} ><DoneIcon /></IconButton>
          <IconButton variant="outlined" onClick={() => {
            setOnAddNew(!onAddNew)
            setPreview(undefined)
          }
          }><CancelIcon /></IconButton>
        </Box>
      </TableCell>
    </TableRow >
      }

            {/* show the product list */}
              {products.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={index} id={row.id}>
                      <TableCell>
                    {edit === row.id ?
                      <TextField
                        name='title'
                        defaultValue={row.title}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                      : <div>{row.title}</div>
                      }
                      </TableCell>
                      <TableCell align="right">
                      {edit === row.id ?
                        <TextField
                          name='description'
                          defaultValue={row.description}
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                        : <div>{row.description}</div>
                      }
                        </TableCell>
                      <TableCell align="right">
                      {edit === row.id ?
                        <TextField
                          type='number'
                          name='price'
                          InputProps={{ inputProps: { min: 0 } }}
                          defaultValue={row.price}
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                        : <div>{row.price}</div>
                      }
                       </TableCell>

                {/* upload image url */}
                      <TableCell align="right">
                      <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              verticalAlign: "middle",
                            }}>
                            {row.productImage && !edit &&
                              <Box>
                                <Box
                                  component="img"
                                  sx={{
                                    height: 93,
                                    width: 200,
                                    maxHeight: { xs: 93, md: 37 },
                                    maxWidth: { xs: 200, md: 100 },
                                  }}
                                  src={row.productImage} 
                                />
                              </Box>}
                            {edit === row.id &&
                              <Box>
                              <TextField
                                  type='string'
                                  name='productImage'
                                  InputProps={{ inputProps: { min: 0 } }}
                                  onChange={e => {
                                    handleChange(e)
                                    }}
                                  />
                                {/* <IconButton component="label" htmlFor="upload-file"><UploadIcon /></IconButton>
                                <input hidden id="upload-file" name="productImage" accept="image/*" multiple type="file" onChange={(e) => {
                                  setSelectedFile(e.target.files[0])
                                  setPicture(e.target.files[0])
                                }} /> */}
                              </Box>
                            }
                          </Box>
                      </TableCell>
                      <TableCell align="right">
                        {edit === row.id ? 
                                      <Box sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                        
                                      }}>
                                        <IconButton
                                          variant="outlined"
                                          size="medium"
                                          onClick={() => {
                                            handleData(tableCellEdit)
                                            setPreview(undefined)
                                            setEdit("")
                                          }} ><DoneIcon /></IconButton>
                                        <IconButton variant="outlined" onClick={() => {
                                          setEdit("")
                                          setPreview(undefined)
                                        }} ><CancelIcon /></IconButton>
                                      </Box>
                        :
                        <>
                        <EditIcon onClick={() => {
                            setEdit(row.id)
                            setTableCellEdit(() => row)
                              }} 
                          sx={{ mr: 2 }} style={{cursor:'pointer'}}/>
                        <DeleteIcon onClick={() => handleClickOpen(row)} style={{cursor:'pointer'}}/>
                        </>
                }
                      </TableCell>
                        
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/*Delete pup-ups */}
      <Dialog open={dialogStatus} >
        <DialogTitle >
          Data:{dialog.id}
        </DialogTitle>
        <DialogContent>
          Are you sure to delete?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onDelete(dialog.id)
            handleClose()
          }}>
            Yes
          </Button>
          <Button onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}