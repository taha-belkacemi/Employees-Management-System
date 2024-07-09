import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        // Vérifie si les mots de passe correspondent
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return; // Arrête l'exécution si les mots de passe ne correspondent pas
        }

        // Envoie les données au serveur si tout est correct
        axios.post('http://localhost:8081/register', { name, email, password })
            .then(res => {
                console.log(res);
                alert('Utilisateur enregistré avec succès'); // Affiche une alerte pour l'enregistrement réussi
                navigate("/dashboard/home");
            }).catch(err => {
                console.log('ERROR', err);
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='Enter Name' className='form-control rounded-0' onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' className='form-control rounded-0' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Password' className='form-control rounded-0' onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirmPassword'><strong>Confirm Password</strong></label>
                        <input type='password' placeholder='Confirm Password' className='form-control rounded-0' onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
