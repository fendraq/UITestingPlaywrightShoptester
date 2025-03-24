import { useState, useEffect } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        console.log("useEffect search:", search);
        if (search === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, products]);

    useEffect(() => {
        fetch("/api/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data)
                let uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            });
    }, []);


    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <div>
            {/* Navbar with Filter Buttons */}
            <nav style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                <button style={{ margin: '5px' }} onClick={() => setSelectedCategory("all")} >All</button>
                {categories.map(category => (
                    <button style={{ margin: '5px' }} key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                    </button>
                ))}
                <input style={{ margin: '5px', padding: '5px', borderRadius: '5px', float: 'right' }}
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </nav>

            {/* Product Grid */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                margin: '10px',
                padding: '10px',
                justifyContent: 'center'
            }}>
                {filteredProducts.length < 1 ? <p>No products!</p> :
                    filteredProducts.map((product) => (
                        <div key={product.id} style={{ margin: 'auto', justifyContent: 'center' }}>
                            <div style={{ backgroundColor: 'gray', borderRadius: '20px', padding: '15px', width: '250px', height: '350px' }}>
                                <h4>{product.name}</h4>
                                <img style={{ width: '200px', height: '220px', backgroundColor: 'white', borderRadius: '10%' }} src={product.image_url} alt={product.name} />
                                <p>Price: ${product.price}</p>
                                <p>{product.description}</p>
                            </div>
                            <button>Add to cart</button>
                        </div>
                    ))
                }
            </section>
        </div>
    );
}

export default Products;