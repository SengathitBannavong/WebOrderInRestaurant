import axios from 'axios';
import { useEffect, useState } from 'react';
import './promocode.css';

const PromoCodeAdmin = ({ url }) => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [newCode, setNewCode] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [newCapacity, setNewCapacity] = useState('');
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
        if (Number(newCapacity) <= 0) {
            setError('Capacity must be greater than 0');
            setSuccess(''); // Clear success if error occurs
            return;
        }
        try {
            const res = await axios.post(`${url}/api/promo`, { code: newCode.trim(), discount: Number(newDiscount), capacity: Number(newCapacity) });
            if (res.data.success) {
                setSuccess('Promo code added');
                setError(''); // Clear error if success
                setNewCode('');
                setNewDiscount('');
                setNewCapacity('');
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
            const res = await axios.delete(`${url}/api/promo/id/${id}`);
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
                <input
                    type="number"
                    placeholder="Capacity"
                    value={newCapacity}
                    min={1}
                    step={1}
                    onChange={e => setNewCapacity(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            {error && <div className="promo-error">{error}</div>}
            {success && <div className="promo-success">{success}</div>}
            {promoCodes.length === 0 && (
                <div className="promo-empty">No promo codes available.</div>
            )}
            <div className="promo-list">
                <div className="promo-list-header">
                    <h3>Active Promo Codes</h3>
                </div>
                
                {promoCodes.length === 0 ? (
                    <div className="promo-empty-state">
                        <div className="empty-icon">🏷️</div>
                        <p>No promo codes available yet</p>
                        <small>Create your first promo code using the form above</small>
                    </div>
                ) : (
                    <div className="promo-grid">
                        {promoCodes.map((promo) => (
                            <div key={promo._id} className="promo-card">
                                <div className="promo-card-header">
                                    <span className="promo-code">{promo.code}</span>
                                    {promo.capacity > 0 && (
                                        <span className={`promo-status ${promo.used >= promo.capacity ? 'inactive' : 'active'}`}>
                                            {promo.used >= promo.capacity ? 'Depleted' : 'Active'}
                                        </span>
                                    )}
                                </div>
                                <div className="promo-card-body">
                                    <div className="promo-discount">
                                        <span className="discount-value">${promo.discount}</span>
                                        <span className="discount-label">discount</span>
                                    </div>
                                    <div className="promo-usage">
                                        <div className="usage-bar">
                                            <div 
                                                className="usage-progress" 
                                                style={{ 
                                                    width: promo.capacity ? `${Math.min(100, (promo.used || 0) / promo.capacity * 100)}%` : '0%' 
                                                }}
                                            ></div>
                                        </div>
                                        <div className="usage-text">
                                            {promo.capacity ? (
                                                <span>{promo.used || 0}/{promo.capacity} used</span>
                                            ) : (
                                                <span>Unlimited uses</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="promo-card-footer">
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete promo code "${promo.code}"?`)) {
                                                handleDeletePromo(promo._id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromoCodeAdmin;
