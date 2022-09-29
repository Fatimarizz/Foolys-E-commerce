import * as yup from "yup";
export const loginschema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(
      /^\w+([-+.']\w+)*@[A-Za-z\d]+\.com$/,
      "email must end with .com extension"
    )
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required"),
});

export const signupshema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^\w+([-+.']\w+)*@[A-Za-z\d]+\.com$/,
      "email must end with .com extension"
    )
    .required("Enter valid email address"),
  name: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "name must include aplhabets only")
    .required("Enter your name"),
  password: yup
    .string()
    .matches(
      /^[A-Za-z0-9]*$/,
      "Minimum 9 character length. no balnk space and special character allowed"
    )
    .required("Password Required"),
  confirm_password: yup
    .string()
    .required("Required")
    .test("password-match", "Password must match", function (value) {
      return this.parent.password === value;
    }),
});
