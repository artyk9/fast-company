import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import validator from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';

const LoginForm = () => {
   const [data, setData] = useState({ email: '', password: '', stayOn: false });
   const [errors, setErrors] = useState({});

   const handleChange = (target) => {
      setData((prevState) => ({
         ...prevState,
         [target.name]: target.value
      }));
   };

   // const validateSchema = yup.object().shape({
   //    password: yup
   //       .string()
   //       .required('Password is required')
   //       .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
   //       .matches(/(?=.*[0-9])/, 'Password must contain a digit')
   //       .matches(
   //          /(?=.*[!@#$%^&*()])/,
   //          'Password must contain a special symbol !@#$%^&*()'
   //       )
   //       .matches(/(?=.{8,})/, 'Password must contain at least 8 characters'),
   //    email: yup
   //       .string()
   //       .required('Email is required')
   //       .email('Email is not correct')
   // });

   const validatorConfig = {
      email: {
         isRequired: { message: 'Email is required' },
         isEmail: { message: 'Email is not correct' }
      },
      password: {
         isRequired: { message: 'Password is required' },
         isCapitalSymbol: {
            message: 'Password must contain an uppercase letter'
         },
         isContainDigit: { message: 'Password must contain a digit' },
         min: {
            message: 'Password must contain at least 8 characters',
            value: 8
         }
      }
   };

   useEffect(() => {
      validate();
   }, [data]);

   const validate = () => {
      const errors = validator(data, validatorConfig);
      // validateSchema
      //    .validate(data)
      //    .then(() => setErrors({}))
      //    .catch((err) => setErrors({ [err.path]: err.message }));

      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const isValid = Object.keys(errors).length === 0;

   const handleSubmit = (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) return;

      console.log(data);
   };
   return (
      <form onSubmit={handleSubmit}>
         <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
         />
         <TextField
            label="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
         />
         <CheckBoxField
            value={data.stayOn}
            onChange={handleChange}
            name="stayOn"
         >
            <a>Stay on system</a>
         </CheckBoxField>
         <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
         >
            Submit
         </button>
      </form>
   );
};

export default LoginForm;
