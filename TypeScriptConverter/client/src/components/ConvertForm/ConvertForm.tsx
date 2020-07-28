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

  const response = await convertFile(file);

  const convertedPdfName = `${path.basename(
    file.name,
    path.extname(file.name)
  )}.pdf`;

  downloadConvertedFile(convertedPdfName, response.data);
};

const convertFile = async (file: any) => {
  const formData = new FormData();
  formData.append("officeFile", file);

  return await axios.post("http://localhost:3333", formData, {
    responseType: "blob",
  });
};

const downloadConvertedFile = (
  convertedPdfName: string,
  convertedFile: Blob
) => {
  const url = window.URL.createObjectURL(new Blob([convertedFile]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", convertedPdfName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const handleOnSubmit = (e: any, fileToUpload: any, formRef: any) => {
  e.preventDefault();
  submitFile(fileToUpload);
  formRef.reset();
};

const ConvertForm = () => {
  const classes = useStyles();
  const [fileToUpload, setFileToUpload] = useState(null);
  let formRef: any = null;

  return (
    <form
      ref={(ref) => formRef = ref}
      className={classes.form}
      onSubmit={(e) => handleOnSubmit(e, fileToUpload, formRef)}
    >
      <FormControl>
        <InputLabel>File to upload:</InputLabel>
        <Input
          name="officeFile"
          type="file"
          inputProps={{ accept: ".docx,.pptx,.xlsx" }}
          onChange={(e) => {
            getFileToUpload(e, setFileToUpload);
          }}
          required
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export { ConvertForm };
