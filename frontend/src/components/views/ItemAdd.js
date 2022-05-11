import { Link } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "../../services/api.service";
import { FormControl, Button, FormHelperText, Container } from "@mui/material";

const ItemAdd = () => {
  const [] = useState("");

  const ItemSchema = Yup.object().shape({
    itemName: Yup.string().required("Required !"),
    expiryDate: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      expiryDate: null,
    },
    validationSchema: ItemSchema,
    onSubmit: (data) => {
      axios
        .post('/api/expiryTracker/addItems', data)
        .then((res) => {
          toast.success(`Item added successfully`);
          formik.resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try agin later !");
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <div>
      <h1 align="center">ITEM ADD</h1>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="dense">
              {/* <InputLabel id="multiple-role-label">Item Name : </InputLabel> */}
              {/* <text>Item Name : </text> */}
              <TextField
                margin="dense"
                label="itemName"
                type="text"
                fullWidth
                {...formik.getFieldProps("itemName")}
                error={
                  formik.touched.itemName && Boolean(formik.errors.itemName)
                }
                helperText={formik.touched.itemName && formik.errors.itemName}
              />
            </FormControl>{" "}
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={formik.values.expiryDate}
                onChange={(value) => formik.setFieldValue("expiryDate", value)}
                label="Expiry Date"
                renderInput={(params) => (
                  <TextField fullWidth margin="dense" {...params} />
                )}
              />
              <FormHelperText
                error={
                  formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
                }
              >
                {formik.errors.expiryDate && formik.touched.expiryDate}
              </FormHelperText>
            </LocalizationProvider>
            <br />
            <br />
            <Button type="submit" fullWidth margin="dense" variant="contained">
              Submit
            </Button>
            
          </Form>
        </FormikProvider>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
     
      <button>
        <Link to={"/"}>LogOut</Link>
      </button>
    </div>
  );
};

export default ItemAdd;
