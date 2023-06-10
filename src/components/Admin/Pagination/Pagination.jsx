import { Box, Button, Typography } from "@mui/material";
const Pagination = ({ page, count, onChange }) => {
  const productsPerPage = 10;
  const pageCount = Math.ceil(count / productsPerPage);
  const handlePrevClick = () => {
    onChange(page - 1);
  };
  const handleNextClick = () => {
    onChange(page + 1);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
      <Button onClick={handlePrevClick} disabled={page === 1}>
        Prev
      </Button>
      <Typography variant="subtitle1" sx={{ mx: 2 }}>
        Page {page} of {pageCount}
      </Typography>
      <Button onClick={handleNextClick} disabled={page === pageCount}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
