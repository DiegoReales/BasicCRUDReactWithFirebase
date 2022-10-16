import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';


const RandomImage = ({ enableChange }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [enableButtonChange, setEnableButtonChange] = useState(true);

    useEffect(() => {
        setEnableButtonChange(enableChange);
    }, [enableChange])

    useEffect(() => {
        handleChange();
    }, [])


    const handleChange = async () => {
        setLoading(true);
        const res = await axios.get("https://picsum.photos/400/300", { responseType:"blob" });
        const file = new FileReader();
        file.readAsDataURL(res.data);
        file.onload = () => { setImage(file.result); }
        setLoading(false);
    }

    return (
        <div className="d-flex flex-column mb-3 p-3 justify-content">
            <Image fluid src={image} />
            {enableButtonChange && 
            <div className='text-center my-4'>
                
                <Button
                    className='w-50'
                    onClick={() => handleChange()}
                    disabled={loading}
                > 
                    {loading ? <span>Cargando...</span> : <span>Cambiar imagen</span>}
                </Button> 
            </div>
            } 
        </div>
    )
}

export default RandomImage;