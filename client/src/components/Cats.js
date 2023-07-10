import React, { useEffect, useState } from 'react'
import './css/cats.css'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const Cats = () => {

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");

    const [nameEdit, setNameEdit] = useState("");
    const [weightEdit, setWeightEdit] = useState("");
    const [ageEdit, setAgeEdit] = useState("");
    const [id, setId] = useState("");
    
    const [req, setReq] = useState(5);
    const [cats, setCats] = useState([]);


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) =>{
    setShow(true);
    console.log(item._id)
    setNameEdit(item.name)
    setWeightEdit(item.weight)
    setAgeEdit(item.age)
    setId(item._id)

  } 


    useEffect(() => {
        fetch('http://localhost:5000/getcat').then((res) => {
            return res.json()
        }).then((data) => {
            setCats(data)
            console.log(data);
        })
    }, [req])

    const addCat = async () => {
        if (name || weight || age) {
            console.log("called");

            const data = await fetch('/addcat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    weight,
                    age
                })
            })

            const res = await data.json()
            if (res.status === 422 || !res) {
                alert("error occurred")
            } else {
                setName("")
                setWeight("")
                setAge("")
                alert("success")
                setReq(req + 1)
                
            }
        } else {
            alert("enter all fields")
        }
    }

    const deleteCat = async (id)=>{
        console.log(id)
        const res = await fetch(`cat/${id}`, {
            method:'DELETE'
        })

        const data = await res.json();
        if(data.acknowledged===true || data){
            console.log(data)
            alert("deleted")
            setReq(req+1)
        } else{
            alert("something went wrong")
            console.log(data)
        }
    }


const handleEditCat = async ()=>{
    if (nameEdit || weightEdit || ageEdit) {
        console.log("editCalled");

        const editData = await fetch('/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                nameEdit,
                weightEdit,
                ageEdit
            })
        })

        const res = await editData.json()
        console.log(res)
        if (!res.message.acknowledged) {
            alert("error occurred")
        } else {
            setNameEdit("")
            setWeightEdit("")
            setAgeEdit("")
            alert("success")
            setShow(false)
            setReq(req + 1)
            
        }
    } else {
        alert("enter all fields")
    }
}


    return (
        <div style={{ margin: "8px" }}>
            <div>

                <h2>Current Cats</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>

                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cats && cats.map((item, index) => {
                                return (

                                    <tr>

                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.weight}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary" onClick={()=>{handleShow(item)}}>Edit</button>
                                            <button type="button" class="btn btn-danger" onClick={()=>{deleteCat(item._id)}}>Delete</button>
                                        </td>

                                    </tr>

                                )
                            })
                        }

                    </tbody>
                </table>

                {/* {
                    cats && cats.map((item, index) => {
                        return (
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.weight}</td>

                                </tr>
                            </table>
                        )
                    })
                } */}

                {/* <table style={{ width: "100%" }}>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Weight</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>cats.</td>
                        <td>55</td>
                        <td>80</td>

                    </tr>
                </table> */}
            </div>
            <div style={{ border: "1px solid black", background: "white", padding: "5px" }}>
                <h2>Add New Cat</h2>
                <input type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={name} />
                <input type="number" placeholder='Weight' onChange={(e) => { setWeight(e.target.value)}} value={weight} />
                <input type="number" placeholder='Age' onChange={(e) => { setAge(e.target.value) }} value={age} />
                <Button onClick={addCat}>save</Button>

            </div>
            

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                value={nameEdit}
                onChange={(e)=>{setNameEdit(e.target.value)}}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Weight"
                value={weightEdit}
                onChange={(e)=>{setWeightEdit(e.target.value)}}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Age"
                value={ageEdit}
                onChange={(e)=>{setAgeEdit(e.target.value)}}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCat}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
