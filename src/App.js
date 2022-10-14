import './App.css';
import {useEffect, useState} from "react";
import {db} from "./firebase";
import {collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore";
import ContactForm from "./Components/ContactForm";
import {Button, Card} from "react-bootstrap";
import Swal from "sweetalert2";

function App() {
  const [value, setValue] = useState({});
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newContact = () => {
    setValue({});
    handleShow();
  }

  const editContact = id => {
    const value = contacts.find(e => e.id === id);
    if (value) {
      setValue(value);
      handleShow();
    }
  }

  const createContact = async (payload) => {
    try {
      const { id } = await addDoc(collection(db, "contacts"), payload);
      setContacts([...contacts, { ...payload, id }])
    } catch (e) {
      console.log(e)
    }
  }

  const deleteContact = async (payload) => {
    try {
      await deleteDoc(doc(db, "contacts", payload));
    } catch (e) {
      console.log(e)
    }
  }

  const updateContact = async (payload) => {
    try {
      const ref = doc(db, "contacts", payload.id)
      await updateDoc(ref, payload);
      setContacts(contacts.map(e => e.id === payload.id ? payload : e));
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const readContacts = async () => {
      try {
        await onSnapshot(collection(db, "contacts"), query => {
          setContacts(query.docs.map(e => ({ ...e.data(), id: e.id })))
        })
      } catch (e) {
        console.log(e)
      }
    }
    readContacts();
  }, []);

  const handleSubmit = () => {
    if (value.id) {
      updateContact(value).then(() => {
        Swal.fire({ title: "Contacto editado!", icon: "success" })
      });
    } else {
      createContact(value).then(() => {
        Swal.fire({ title: "Contacto creado!", icon: "success" })
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <ContactForm
          form={value}
          setForm={setValue}
          onSubmit={handleSubmit}
          show={show}
          onHide={handleClose}
        />
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title>Lista de Contactos</Card.Title>
            <Button variant="success" onClick={newContact}>Agregar</Button>
          </Card.Header>
          <div className="table-responsive">
            <table className="table table-stripped">
              <thead>
                <tr>
                  <td>No. Identificación</td>
                  <td>Nombre</td>
                  <td>Apellido</td>
                  <td>Celular</td>
                  <td>Dirección</td>
                  <td>Correo</td>
                  <td>Cargo</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
              {contacts.map((c, i) =>
                <tr key={i}>
                  <td>{c.dni}</td>
                  <td>{c.name}</td>
                  <td>{c.lastname}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{c.email}</td>
                  <td>{c.jobtitle}</td>
                  <td>
                    <button type="button"
                            className="btn btn-sm btn-warning mx-1"
                            onClick={() => editContact(c.id)}
                    >
                      Editar
                    </button>
                    <button type="button"
                            className="btn btn-sm btn-danger mx-1"
                            onClick={() => deleteContact(c.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </Card>
      </header>
    </div>
  );
}

export default App;
