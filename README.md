# DynamicFormGenerator Component

A React component that dynamically generates forms based on a configuration object. This component handles rendering form fields, validation, submission, and provides feedback to users.

## Features

1. **Dynamic Form Rendering**: Generates form fields based on a provided configuration object.
2. **Input Validation**: Validates user inputs according to the rules defined in the configuration.
3. **Error Handling**: Displays error messages for invalid inputs.
4. **Success Feedback**: Shows a success message upon successful form submission.
5. **Bonus Feature**: Allows dynamic addition and removal of form fields at runtime.

## Configuration Object

The `DynamicFormGenerator` component accepts a configuration object that defines the structure and validation rules of the form fields.

```javascript
const formConfig = [
  { name: 'username', label: 'Username', type: 'text', required: true, minLength: 3 },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'age', label: 'Age', type: 'number', min: 18, max: 100 },
  { name: 'bio', label: 'Bio', type: 'textarea', maxLength: 200 },
];
