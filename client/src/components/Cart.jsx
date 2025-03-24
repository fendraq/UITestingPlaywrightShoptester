import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                            <img
                                src={item.image_url}
                                alt={item.name}
                                style={{ width: '50px', height: '50px' }}
                            />
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <div className="quantity">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    -
                                </button>
                                <span style={{ margin: '10px' }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    +
                                </button>
                            </div>
                            <p>Total: ${item.price * item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${getTotal()}</h3>
                    </div>
                </>
            )}
        </div>
    );
}