import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Grid,
  CardHeader,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const OneMemoCard = ({ memo }) => {
  if (!memo) {
    return (
      <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
        <CardHeader title="OneMemo Details" />
        <CardContent>
          <Typography variant="h5" color="text.secondary" align="center">
            OneMemo details are not available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 900, margin: "30px auto", border: "3px solid #ccc" }}>
      <CardContent>
        {/* <Typography variant="h5" component="div" gutterBottom>
          {memo.tittle} - {memo.subCategory?.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Category: {memo.category?.title} ({OneMemo.category?.metaTitle})
        </Typography> */}

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
         Date;
        </Typography>
        <Typography variant="body1">{memo.date}</Typography>

        <Divider sx={{ my: 2 }} />
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
         Memo content:
        </Typography>
        <Typography variant="body1">{memo.memos}</Typography>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
         Title
        </Typography>
        <Typography variant="body1">{memo.tittle}</Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Created At:{" "}
              {memo.createdAt
                ? new Date(memo.createdAt).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Updated At:{" "}
              {memo.updatedAt
                ? new Date(memo.updatedAt).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Link to="/" size="small" color="primary">
          Back to List
        </Link>
      </CardActions>
    </Card>
  );
};

const OneMemo = () => {
  const location = useLocation();
  const [memo, setOneMemo] = useState(null);

  useEffect(() => {
    console.log("Location state:", location.state); 
    setOneMemo(location.state?.currentMemo || null);
  }, [location.state]);

  return <OneMemoCard memo={memo} />;
};

export default OneMemo;

