import { useState } from 'react';

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('api/users', { credentials: 'include' });
        const data = await response.json();
        setUsers(data);
    }

    const fetchOrders = async () => {
        const response = await fetch('api/orders', { credentials: 'include' });
        const data = await response.json();
        setOrders(data);
    }

    const fetchProducts = async () => {
        const response = await fetch('api/products', { credentials: 'include' });
        const data = await response.json();
        setProducts(data);
    }

    const handleDeleteOrder = async (id) => {
        const response = await fetch(`api/orders/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            fetchOrders();
        }
    }

    const handleDeleteUser = async (id) => {
        const response = await fetch(`api/users/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            fetchUsers();
        }
    }

    const handleDeleteProduct = async (id) => {
        const response = await fetch(`api/products/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            fetchProducts();
        }
    }



    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>This is where you can add, change and delete things to and from the database, such as new users, products.
                You can fetch all users, fetch all orders. And you can filter through your data</p>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '0px' }}>Users</h2>
                    <button style={{ margin: '10px', backgroundColor: 'darkgreen' }} onClick={fetchUsers}>Fetch Users</button>
                </div>
                <ul>
                    {users.map(user => <li key={user.id}>
                        <div style={{ border: '1px solid gray', padding: '10px', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <p>{user.email}</p>
                            </div>
                            <button style={{ margin: '10px', backgroundColor: 'darkred' }} onClick={() => handleDeleteUser(user.id)}>Delete user</button>
                        </div>
                    </li>)}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ margin: '0px' }}>Orders</h2>
                    <button style={{ margin: '10px', backgroundColor: 'darkgreen' }} onClick={fetchOrders}>Fetch Orders</button>
                </div>
                <ul>
                    {orders.map(order => <li key={order.id}><div style={{ border: '1px solid gray', padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <p>ID: {order.id}</p>
                            <p>Username: {order.username}</p>
                            <p>Product: {order.productName}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Price: {order.price}</p>
                            <p>Date: {Date(order.created_at)}</p>
                        </div>
                        <button style={{ margin: '10px', backgroundColor: 'darkred' }} onClick={() => handleDeleteOrder(order.id)}>Delete order</button>
                    </div></li>)}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ margin: '0px' }}>Products</h2>
                    <button style={{ margin: '10px', backgroundColor: 'darkgreen' }} onClick={fetchProducts}>Fetch Products</button>
                </div>
                <ul>
                    {products.map(product => <li key={product.id}><div style={{ border: '1px solid gray', padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                        </div>
                        <img style={{ width: '70px', marginLeft: '10px' }} src={product.image_url} alt="" />
                        <button style={{ margin: '10px', backgroundColor: 'darkred' }} onClick={() => handleDeleteProduct(product.id)}>Delete product</button>
                    </div>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}