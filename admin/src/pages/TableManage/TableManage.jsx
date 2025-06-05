import axios from 'axios';
import { useEffect, useState } from 'react';
import './TableManage.css';

const TableManage = ({ url }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [addingTable, setAddingTable] = useState(false);
    const [activeOrders, setActiveOrders] = useState({});
    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const [selectedTableOrders, setSelectedTableOrders] = useState([]);
    const [selectedTableId, setSelectedTableId] = useState(null);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/table/list`);
            if (response.data && response.data.success) {
                setTables(response.data.data || []);
            }
            setError(null);
        } catch (err) {
            setError('Failed to load tables. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/active`);
            if (response.data && response.data.success) {
                // Convert array of orders to object keyed by table number for easy lookup
                const ordersByTable = {};
                response.data.data.forEach(order => {
                    if (order.address && order.address.table && 
                        (order.status === 'Cooking' || order.status === 'Eating')) {
                        const tableId = order.address.table;
                        if (!ordersByTable[tableId]) {
                            ordersByTable[tableId] = [];
                        }
                        ordersByTable[tableId].push(order);
                    }
                });
                setActiveOrders(ordersByTable);
            }
        } catch (err) {
            console.error('Failed to fetch active orders:', err);
        }
    };

    const updateTableStatus = async (tableIndex, newStatus) => {
        const tableHasActiveOrders = activeOrders[tableIndex] && activeOrders[tableIndex].length > 0;
        
        if (tableHasActiveOrders && newStatus === 'Available') {
            alert("Cannot set table to Available. There are active orders for this table.");
            return;
        }
        
        const confirmed = window.confirm(
            `Are you sure you want to set Table ${tableIndex} to ${newStatus}?`
        );
        if (!confirmed) return;

        try {
            const response = await axios.put(`${url}/api/table/status`, {
                tableIndex,
                status: newStatus,
            });

            if (response.data && response.data.success) {
                setTables((prev) =>
                    prev.map((table) =>
                        table.tableIndex === tableIndex
                            ? { ...table, tableStatus: newStatus }
                            : table
                    )
                );
            }
        } catch (err) {
            console.error('Failed to update table status:', err);
        }
    };

    const addNewTable = async () => {
        try {
            setAddingTable(true);

            // check last tableIndex to determine the next index
            const lastTable = tables[tables.length - 1];
            console.log('Last table:', lastTable);

            const newTable = {
                tableIndex: lastTable ? String(Number(lastTable.tableIndex) + 1) : 1, 
                tableStatus: 'Available' // Default status for new table
            }
            
            // Call the API to add a new table
            const response = await axios.post(`${url}/api/table/add`, newTable);
            
            if (response.data && response.data.success) {
                // Refresh the table list to show the new table
                await fetchTables();
                
                // Show success message
                alert('New table added successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to add table');
            }
        } catch (err) {
            setError(`Failed to add table: ${err.message}`);
        } finally {
            setAddingTable(false);
        }
    };

    const showTableOrders = (tableIndex) => {
        if (activeOrders[tableIndex] && activeOrders[tableIndex].length > 0) {
            setSelectedTableOrders(activeOrders[tableIndex]);
            setSelectedTableId(tableIndex);
            setShowOrderPopup(true);
        } else {
            alert("No active orders for this table.");
        }
    };

    useEffect(() => {
        fetchTables();
        fetchActiveOrders();
    }, [url]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredTables = tables.filter((table) => {
        const matchesSearch = table.tableIndex
            .toString()
            .includes(searchQuery);
        const matchesStatus =
            filterStatus === 'All' || table.tableStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Helper function to determine if a table has active orders
    const hasActiveOrders = (tableIndex) => {
        return activeOrders[tableIndex] && activeOrders[tableIndex].length > 0;
    };

    return (
        <div className="table-manage-container">
            <div className="table-manage-header">
                <h1>Table Management</h1>
                <div className="header-buttons">
                    <button
                        className="add-table-button"
                        onClick={addNewTable}
                        disabled={addingTable}
                    >
                        {addingTable ? 'Adding...' : 'Add New Table'}
                    </button>
                    <button
                        className="refresh-button"
                        onClick={() => {
                            fetchTables();
                            fetchActiveOrders();
                        }}
                        disabled={loading}
                    >
                        {loading ? <div className="spinner" /> : 'Refresh'}
                    </button>
                </div>
            </div>

            <div className="controls">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by table #..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select
                    className="status-dropdown"
                    value={filterStatus}
                    onChange={handleStatusFilter}
                >
                    <option value="All">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading-message">Loading tables...</div>
            ) : filteredTables.length === 0 ? (
                <div className="no-tables-message">No tables found.</div>
            ) : (
                <>
                {/* Desktop / Tablet: regular table */}
                <div className="tables-wrapper">
                    <table className="tables-table">
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>Status</th>
                                <th>Active Orders</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTables.map((table) => (
                                <tr
                                    key={table.tableIndex}
                                    className={`table-row ${table.tableStatus.toLowerCase()}`}
                                >
                                    <td>
                                        <div className="table-number">
                                            #{table.tableIndex}
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`status-badge ${table.tableStatus.toLowerCase()}`}
                                        >
                                            {table.tableStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {hasActiveOrders(table.tableIndex) ? (
                                            <button 
                                                className="view-orders-btn"
                                                onClick={() => showTableOrders(table.tableIndex)}
                                            >
                                                View Orders ({activeOrders[table.tableIndex].length})
                                            </button>
                                        ) : (
                                            <span className="no-orders">No active orders</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {table.tableStatus === 'Available' ? (
                                                <button
                                                    className="action-btn unavailable-btn"
                                                    onClick={() =>
                                                        updateTableStatus(
                                                            table.tableIndex,
                                                            'Unavailable'
                                                        )
                                                    }
                                                >
                                                    Set Unavailable
                                                </button>
                                            ) : (
                                                <button
                                                    className="action-btn available-btn"
                                                    onClick={() =>
                                                        updateTableStatus(
                                                            table.tableIndex,
                                                            'Available'
                                                        )
                                                    }
                                                    disabled={hasActiveOrders(table.tableIndex)}
                                                >
                                                    Set Available
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: card-based display */}
                <div className="cards-container">
                    {filteredTables.map((table) => (
                        <div
                            key={table.tableIndex}
                            className="table-card"
                        >
                            <div className="card-info">
                                <div className="table-number">#{table.tableIndex}</div>
                                <span
                                    className={`status-badge ${table.tableStatus.toLowerCase()}`}
                                >
                                    {table.tableStatus}
                                </span>
                            </div>
                            
                            {hasActiveOrders(table.tableIndex) && (
                                <div className="card-orders">
                                    <button 
                                        className="view-orders-btn mobile"
                                        onClick={() => showTableOrders(table.tableIndex)}
                                    >
                                        View Orders ({activeOrders[table.tableIndex].length})
                                    </button>
                                </div>
                            )}
                            
                            <div className="card-actions">
                                {table.tableStatus === 'Available' ? (
                                    <button
                                        className="action-btn unavailable-btn"
                                        onClick={() =>
                                            updateTableStatus(
                                                table.tableIndex,
                                                'Unavailable'
                                            )
                                        }
                                    >
                                        Set Unavailable
                                    </button>
                                ) : (
                                    <button
                                        className="action-btn available-btn"
                                        onClick={() =>
                                            updateTableStatus(
                                                table.tableIndex,
                                                'Available'
                                            )
                                        }
                                        disabled={hasActiveOrders(table.tableIndex)}
                                    >
                                        Set Available
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}

            {/* Orders Popup */}
            {showOrderPopup && (
                <div className="orders-popup-overlay">
                    <div className="orders-popup">
                        <div className="orders-popup-header">
                            <h3>Active Orders for Table #{selectedTableId}</h3>
                            <button 
                                className="close-popup"
                                onClick={() => setShowOrderPopup(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="orders-list">
                            {selectedTableOrders.map((order, index) => (
                                <div key={index} className="order-item">
                                    <div className="order-header">
                                        <span className="order-id">Order #{order._id}</span>
                                        <span className={`order-status ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <div className="order-items">
                                            <strong>Items:</strong>
                                            <ul>
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.name} x {item.quantity} 
                                                        (${item.price})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="order-total">
                                            <strong>Total:</strong> ${order.amount}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableManage;