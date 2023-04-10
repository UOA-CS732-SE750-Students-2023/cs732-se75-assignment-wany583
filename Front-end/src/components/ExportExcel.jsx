import * as XLSX from 'xlsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

/*
Import `xlsx` to implement export tha excel.
 */
const ExportExcel = ({ Products, setMessage }) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx")

    setMessage('export-success')
  }
  return (
    <Box sx={{
      display: "flex",
    }}>
      <p> Export Excel</p>
      <IconButton
        sx={{ px: 1.5 }}
        onClick={() => handleOnExport(Products)}>
        <FileDownloadIcon />
      </IconButton >
    </Box>
  )
}

export default ExportExcel