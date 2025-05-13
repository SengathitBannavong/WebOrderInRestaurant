import React, { useState, useEffect } from 'react';
import './promocode.css';
import axios from 'axios';

const PromoCodeAdmin = ({ url }) => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [newCode, setNewCode] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const fetchPromoCodes = async () => {
        try {
            const res = await axios.get(`${url}/api/promo`);
            setPromoCodes(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch promo codes');
        }
    };

    const handleAddPromo = async (e) => {
        e.preventDefault();
        if (!newCode.trim() || !newDiscount) {
            setError('Please enter code and discount');
            return;
        }
        try {
            const res = await axios.post(`${url}/api/promo`, { code: newCode.trim(), discount: Number(newDiscount) });
            if (res.data.success) {
                setSuccess('Promo code added');
                setNewCode('');
                setNewDiscount('');
                fetchPromoCodes();
            } else {
                setError(res.data.message || 'Failed to add promo code');
            }
        } catch (err) {
            setError('Failed to add promo code');
        }
    };

    const handleDeletePromo = async (id) => {
        try {
            const res = await axios.delete(`${url}/api/promo/${id}`);
            if (res.data.success) {
                setSuccess('Promo code deleted');
                fetchPromoCodes();
            } else {
                setError(res.data.message || 'Failed to delete promo code');
            }
        } catch (err) {
            setError('Failed to delete promo code');
        }
    };

    return (
        <div className="promo-admin">
            <h2>Manage Promo Codes</h2>
            <form onSubmit={handleAddPromo} className="promo-form">
                <input
                    type="text"
                    placeholder="Promo code"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Discount ($)"
                    value={newDiscount}
                    onChange={e => setNewDiscount(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            {error && <div className="promo-error">{error}</div>}
            {success && <div className="promo-success">{success}</div>}
            <div className="promo-list">
                <h3>Existing Promo Codes</h3>
                <ul>
                    {promoCodes.map((promo) => (
                        <li key={promo._id}>
                            <span>{promo.code} - ${promo.discount}</span>
                            <button onClick={() => handleDeletePromo(promo._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PromoCodeAdmin;
