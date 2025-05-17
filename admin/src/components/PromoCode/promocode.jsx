import axios from 'axios';
import { useEffect, useState } from 'react';
import './promocode.css';

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
            setSuccess(''); // Clear success if error occurs
        }
    };

    const handleAddPromo = async (e) => {
        e.preventDefault();
        if (!newCode.trim() || !newDiscount) {
            setError('Please enter code and discount');
            setSuccess(''); // Clear success if error occurs
            return;
        }
        if (Number(newDiscount) <= 0) {
            setError('Discount must be greater than 0');
            setSuccess(''); // Clear success if error occurs
            return;
        }
        try {
            const res = await axios.post(`${url}/api/promo`, { code: newCode.trim(), discount: Number(newDiscount) });
            if (res.data.success) {
                setSuccess('Promo code added');
                setError(''); // Clear error if success
                setNewCode('');
                setNewDiscount('');
                fetchPromoCodes();
            } else {
                setError(res.data.message || 'Failed to add promo code');
                setSuccess(''); // Clear success if error occurs
            }
        } catch (err) {
            setError('Failed to add promo code');
            setSuccess(''); // Clear success if error occurs
        }
    };

    const handleDeletePromo = async (id) => {
        try {
            const res = await axios.delete(`${url}/api/promo/${id}`);
            if (res.data.success) {
                setSuccess('Promo code deleted');
                setError(''); // Clear error if success
                fetchPromoCodes();
            } else {
                setError(res.data.message || 'Failed to delete promo code');
                setSuccess(''); // Clear success if error occurs
            }
        } catch (err) {
            setError('Failed to delete promo code');
            setSuccess(''); // Clear success if error occurs
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
                    onChange={e => setNewCode(e.target.value.replace(/\s+/g, '').toLowerCase())}
                    pattern="[a-zA-Z0-9]+"
                    title="Promo code must be alphanumeric, no spaces."
                />
                <input
                    type="number"
                    placeholder="Discount ($)"
                    value={newDiscount}
                    min={1}
                    step={1}
                    onChange={e => setNewDiscount(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            {error && <div className="promo-error">{error}</div>}
            {success && <div className="promo-success">{success}</div>}
            {promoCodes.length === 0 && (
                <div className="promo-empty">No promo codes available.</div>
            )}
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
