import React, { useState } from 'react';
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEye,
   faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "formik";

interface Props {
   label: String;
   top?: number | string;
   placeholder?: String;
   type?: string;
   onChange: any;
   value: any;
   name: string;
   error?: any;
}

const InputText: React.FC<Props> = ({ label, top = 10, placeholder, type = "text", onChange, value, name, error = "" }) => {

   const [fieldVisible, setFieldVisible] = useState(false)

   const showTextField = () => {
      setFieldVisible(!fieldVisible);
   };

   const getType = () => {
      if (type === 'password') {
         return fieldVisible ? 'text' : type
      }

      return type;
   }

   return (
      <div className="d-flex" style={{marginTop: top}}>
         <div className="form-field-icon">
            <img
               style={{ width: '18px', height: '14px' }}
               src="/icons/email.svg"
               height="23px"
               width="23px"
            />
         </div>
         <div className="w-100" style={{ marginTop: '-7px' }}>
            <label style={{ fontSize: 10, color: '#373A40' }} className="text-uppercase">{label}</label>
            <Field
               type={getType()}
               name={name}
               id={name}
               className="custom-text-box"
               placeholder={placeholder}
               onChange={onChange}
               value={value}
               autoComplete="off"
            />
            {type === 'password' ? 
               <div style={{position: 'absolute',right: '50px',marginTop: '-28px'}}>
                  <FontAwesomeIcon
                     onClick={showTextField}
                     icon={fieldVisible ? faEye : faEyeSlash}
                     style={{
                        color: fieldVisible ? 'black' : 'gray',
                        cursor: 'pointer'
                     }}
                  />
               </div>
            : ''}
            <div id={"error-" + name} className="text-danger">{error ? error.charAt(0).toUpperCase() + error.slice(1) : null}</div>
         </div>
      </div>
   )
}

export default InputText;