import React, { useState } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import useFetch from './useFetch'
const CrudApp = () => {
    const { datas, error, loading } = useFetch('https://jsonplaceholder.typicode.com/posts')
    console.log(datas, "api data")

    const initialValue = {
        name: '',
        age: '',
        gender: 'male'
    }
    const [data, setData] = useState([])
    const [inputs, setInputs] = useState(initialValue)
    const [isEdit, setIsEdit] = useState(false);
    const [todoIndex, setTodoIndex] = useState(null);

    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputs((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }


    // handle submit data
    const handleSubmit = () => {
        const id = Math.floor(Math.random() * 9000) + 1000;
        console.log(id, "idss")
        if (inputs.age < 18) {
            return toast.error('Only eligiable 18 or 18 +')
        }
        if (isEdit && todoIndex !== null) {
            handleUpdateTodo()
            setInputs({
                name: '',
                age: '',
                gender: 'male'
            })
        } else {
            //add data logic here
            if (inputs.name.trim().length !== 0 || inputs.age.trim().length !== 0) {
                setData([...data, { id, ...inputs }])
                toast.success('Added')
                setInputs({
                    name: '',
                    age: '',
                    gender: 'male'
                })

            } else {
                toast.error('Please fill the all the fields')
            }
        }

    }
    const deleteTodo = (id) => {
        const newData = data.filter((ele) => ele.id !== id)
        setData(newData)
        toast.info('Deleted')
    }
    const editTodo = (id, data) => {
        setIsEdit(true)
        setTodoIndex(id)
        setInputs(data);
    }

    const handleUpdateTodo = () => {
        setData((prevData) =>
            prevData.map((ele) => ele.id === todoIndex ? { ...inputs } : ele)
        );

        setIsEdit(false);
        toast.success('Updated')
    }
    console.log('data', data)
    if (loading) {
        return <h1>Please wait fetching API...</h1>
    }
    return (
        <Container>
            <h2 className='text-center py-5'>CRUD APP</h2>
            <div className="todo-form">
                <div className="input-field">
                    <input type="text" placeholder='Enter your name' value={inputs.name} name="name" onChange={handleInputValues} />
                </div>
                <div className="input-field">
                    <input type="text" placeholder='Enter your name' value={inputs.age} name="age" onChange={handleInputValues} />
                </div>
                <div className="input-field">
                    <select value={inputs.gender} name='gender' onChange={handleInputValues} >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>

                <div className="input-field text-center">
                    <Button onClick={handleSubmit} className='col-6 fs-3' >{isEdit ? 'Update' : 'Add'}</Button>
                </div>
                <div className="todo-table">
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((ele) => (
                                <tr key={ele.id}>
                                    <td>{ele.name}</td>
                                    <td>{ele.age}</td>
                                    <td>{ele.gender}</td>
                                    <td>
                                        <Button className='btn btn-danger mx-2' onClick={() => deleteTodo(ele.id)}>Delete</Button>
                                        <Button onClick={() => editTodo(ele.id, ele)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <h1 className='text-center py-5'>API Data</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map((ele) => (
                        <tr key={ele.id}>
                            <td>{ele.title}</td>
                            <td>{ele.body}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CrudApp