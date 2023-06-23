import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
export default function TodoItem({
  id,
  title,
  description,
  isDone,
  changeIsDone,
}) {
  let colorCard = isDone ? "#346751" : "#393E46";
  let textDone = isDone ? "line-through" : "none";
  let checkBackground = isDone ? "#fff" : "transparent";
  function handlechangeIsDone() {
    changeIsDone(id);
  }
  return (
    <Card
      sx={{
        minHeight: "100px",
        marginBottom: 2,
      }}
      style={{
        background: colorCard,
        transition: "all 0.2s linear",
        borderBottom: "3px solid #D65A31",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            sm={8}
            textAlign="right"
            style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                textDecoration: textDone,
                color: "#fff",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontWeight: "lighter",
                color: "#fff",
                textDecoration: textDone,
              }}
            >
              {description}
            </Typography>
          </Grid>

          <Grid
            sm={4}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #82CD47 2px",
                  color: "#82CD47",
                  background: checkBackground,
                }}
                onClick={handlechangeIsDone}
              >
                <CheckIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #6FEDD6 2px",
                  color: "#6FEDD6",
                }}
              >
                <EditIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  border: "solid #F65A83 2px",
                  color: "#F65A83",
                }}
              >
                <DeleteForeverIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
