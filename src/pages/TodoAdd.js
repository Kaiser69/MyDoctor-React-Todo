import React, { useEffect} from 'react';
import { Grid} from '@material-ui/core';
import Controls from "../components/controls/Controls";
import {CommonUse, Form, useForm} from '../components/useForm';
//for the backend api(use local storage)
// local storage object and adds a data item to it using <Storage.setItem()>
import * as todoService from '../services/todoService';


const todoItems =[
    {id:'job', title:'Job'},
    {id:'family', title:'Family'},
    {id:'others', title:'Others'},
]

const initialFValues = {
    id: 0,
    title: '',
    description: '',
    type:'job',
    sortingId: '',
    todoDate: new Date(),
    isPermanent: false,
}

export default function TodoAdd(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors}
        if ('title' in fieldValues)
           temp.title = values.title ? "" : "This field is required."
        if ('description' in fieldValues)
           temp.description = values.description ? "" : "This field is required."
        if ('sortingId' in fieldValues)
           temp.sortingId = fieldValues.sortingId.length != 0? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")

    }

    const{
       values,
       setValues,
       errors,
       setErrors,
       handleInputChange,
       resetForm,
    } = useForm(initialFValues, true, validate);
   
    const handleSubmit = e => {
        e.preventDefault()
      if (validate()) {
         addOrEdit(values, resetForm);  
    }
   } 
         
        useEffect(() => {
             if (recordForEdit != null)
               setValues({
                     ...recordForEdit
                })
        }, [recordForEdit])

  return (
        <Form onSubmit={handleSubmit}>
       <Grid container>
            <Grid item xs={6}>
                 <Controls.Input 
                     name= "title"
                     label="Item title"
                     value={values.title}
                     onChange={handleInputChange}
                     error={errors.title}
               />
                 <Controls.Input
                     label="Item description"
                     name="description"
                     value={values.description}
                     onChange={handleInputChange}
                     error={errors.description}
                />

            </Grid>
            <Grid item xs={6}>
                <Controls.RadioGroup
                      name="type"
                      label="Item type"
                      value={values.type}
                      onChange={handleInputChange}
                      items={todoItems}/>
              
                <Controls.Select
                   name='sortingId'
                   label="Task"
                   value={values.sortingId}
                   onChange={handleInputChange}
                   options={todoService.getTodoCollection()} 
                   error={errors.sortingId}
                   />
                  <Controls.DatePicker
                      name="todoDate"
                      label="Date"
                      value={values.todoDate}
                      onChange={handleInputChange}
                  />
                   <Controls.Checkbox
                    name="isEmergency"
                    label="TodoList"
                    value={values.isEmergency}
                    onChange={handleInputChange}
                   /> 
                   <div>
                        <Controls.Button
                            type="submit"
                            text="Add" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                             />
                    </div>
 
            </Grid>
       </Grid>
       </Form>
  
  );
}
