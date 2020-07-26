import React, { useState } from "react";
import path from "path";
import axios from "axios";
import {
  makeStyles,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
}));

const getFileToUpload = (e: any, setFileToUpload: any) => {
  const file = e.target.files[0];
  setFileToUpload(file);
};

const submitFile = async (file?: any) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("officeFile", file);

  const response = await axios.post("http://localhost:3030", formData, {
    responseType: "blob",
  });

  const convertedPdfName = `${path.basename(
    file.name,
    path.extname(file.name)
  )}.pdf`;

  downloadConvertedFile(convertedPdfName, response.data);
};

const downloadConvertedFile = (
  convertedPdfName: string,
  convertedFile: Blob
) => {
  const url = window.URL.createObjectURL(new Blob([convertedFile]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", convertedPdfName); //or any other extension
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const ConvertForm = () => {
  const classes = useStyles();

  const [fileToUpload, setFileToUpload] = useState(null);

  return (
    <form className={classes.form}>
      <FormControl>
        <InputLabel>File to upload:</InputLabel>
        <Input
          name="officeFile"
          type="file"
          inputProps={{ accept: ".docx,.pptx,.xlsx" }}
          onChange={(e) => {
            getFileToUpload(e, setFileToUpload);
          }}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitFile(fileToUpload);
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export { ConvertForm };
