import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react";

const products = [
  { id: 1, name: "The Everyday Shirt", category: "Tops", price: 1490, color: "Oat", tag: "BESTSELLER", image: "photo-1598033129183-c4f50c736f10" },
  { id: 2, name: "Relaxed Tailored Trouser", category: "Bottoms", price: 2190, color: "Stone", tag: "NEW", image: "photo-1506629905607-d9a4d9a1e2c3" },
  { id: 3, name: "Soft Knit Tank", category: "Tops", price: 990, color: "Ivory", tag: "", image: "photo-1551163943-3f6a855d1153" },
  { id: 4, name: "The Weekend Tote", category: "Accessories", price: 1290, color: "Natural", tag: "LOW STOCK", image: "photo-1590874103328-eac38a683ce7" },
  { id: 5, name: "Everyday Denim", category: "Bottoms", price: 2490, color: "Indigo", tag: "", image: "photo-1541099649105-f69ad21f3246" },
  { id: 6, name: "Linen Blend Dress", category: "Dresses", price: 2890, color: "Sage", tag: "NEW", image: "photo-1496747611176-843222e1e57c" },
  { id: 7, name: "Structured Shoulder Bag", category: "Accessories", price: 1990, color: "Chocolate", tag: "", image: "photo-1584917865442-de89df76afd3" },
  { id: 8, name: "Easy Sunday Set", category: "Dresses", price: 3190, color: "Sand", tag: "", image: "photo-1483985988355-763728e1935b" },
];

const categories = ["All", "New", "Tops", "Bottoms", "Dresses", "Accessories"];
const imageUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function App() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) =>
      (category === "All" || (category === "New" ? product.tag === "NEW" : product.category === category)) &&
      `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, sort, searchTerm]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  function toggleSaved(id) {
    setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  }

  function checkout() {
    setNotice("Demo checkout: connect a payment provider to accept real orders.");
    setCartOpen(false);
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <>
      <div className="announcement">A little more considered. Free shipping on orders over ₹2,999.</div>
      <header className="header">
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <a className="wordmark" href="#home">NORTHLINE<span>®</span></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop all</a>
          <a href="#shop" onClick={() => { setCategory("New"); setSearchTerm(""); setMenuOpen(false); }}>New arrivals</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X /> : <Search />}</button>
          <button className="icon-button bag-button" aria-label={`Shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}><ShoppingBag /><span>{cartCount}</span></button>
        </div>
      </header>

      {searchOpen && <div className="search-bar"><Search size={18} /><input autoFocus placeholder="Search shirts, bags, dresses..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><button onClick={() => { setSearchTerm(""); setSearchOpen(false); }} aria-label="Close search"><X size={18} /></button></div>}

      <main id="home">
        <section className="hero">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90" alt="Friends exploring a thoughtfully styled fashion collection" />
          <div className="hero-overlay"></div>
          <div className="hero-content"><p className="eyebrow light">THE EVERYDAY EDIT · 01 / 26</p><h1>Everyday,<br /><em>considered.</em></h1><p>Pieces you reach for. Quality you can feel.<br />A little less, a little better.</p><a className="light-button" href="#shop">Explore the collection <ArrowRight size={17} /></a></div>
          <span className="hero-index">01 — 08 / NEW SEASON</span>
        </section>

        <section className="intro-strip" id="story"><p>MADE FOR REAL LIFE</p><h2>Wear more of what<br /><em>feels like you.</em></h2><span>Easy silhouettes. Thoughtful fabrics. Pieces that work hard in your wardrobe and stay there for a long time.</span></section>

        <section className="shop-section" id="shop">
          <div className="shop-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Good things, <em>on repeat.</em></h2></div><button className="filter-toggle" onClick={() => setSort(sort === "featured" ? "price-low" : sort === "price-low" ? "price-high" : "featured")}><SlidersHorizontal size={16} /> Sort: {sort === "featured" ? "Featured" : sort === "price-low" ? "Price low-high" : "Price high-low"} <ArrowDown size={14} /></button></div>
          <div className="category-row" role="group" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? "category active" : "category"} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="results-line"><span>{visibleProducts.length} pieces</span><span>Designed to be worn, again and again.</span></div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image"><img src={imageUrl(product.image)} alt={product.name} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}<button className={saved.includes(product.id) ? "save-button saved" : "save-button"} aria-label={saved.includes(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name}`} onClick={() => toggleSaved(product.id)}><Heart size={17} fill={saved.includes(product.id) ? "currentColor" : "none"} /></button><button className="quick-add" onClick={() => addToCart(product)}>Add to bag <span>+</span></button></div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.color} · {product.category}</p></div><strong>{money(product.price)}</strong></div>
            </article>
          ))}</div> : <div className="empty-results"><p>No pieces found for “{searchTerm}”.</p><button onClick={() => { setSearchTerm(""); setCategory("All"); }}>Clear filters</button></div>}
          <div className="shop-bottom"><p>Thoughtfully chosen. Made to be lived in.</p><a href="#home">Back to top <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="values">
          <div className="value-image"><img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85" alt="Neutral fashion garments on a clothing rack" loading="lazy" /></div>
          <div className="value-copy"><p className="eyebrow">OUR POINT OF VIEW</p><h2>Buy less.<br /><em>Choose well.</em></h2><p>We believe personal style is built over time. We focus on versatile shapes, wearable colours and thoughtful details that make getting dressed feel simple.</p><a href="#shop" className="text-link">Find your everyday pieces <ArrowRight size={16} /></a><div className="value-footnote"><span>01 / QUALITY</span><span>02 / VERSATILITY</span><span>03 / INTENTION</span></div></div>
        </section>

        <section className="newsletter"><p className="eyebrow">NOTES FROM NORTHLINE</p><h2>A good thing, <em>occasionally.</em></h2><p>New collections, styling notes and small things worth knowing.</p><NewsletterForm setNotice={setNotice} /></section>
      </main>

      <footer className="footer"><a className="wordmark" href="#home">NORTHLINE<span>®</span></a><p>Everyday pieces, considered carefully.</p><div><a href="#shop">Shop</a><a href="#story">Our approach</a><a href="mailto:hello@northline.example">Contact</a></div><small>© {new Date().getFullYear()} Northline. Concept store built by Ishani Bora.</small></footer>

      {notice && <div className="toast" role="status" aria-live="polite">{notice}</div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping bag"><div className="drawer-heading"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X /></button></div>
        {cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={imageUrl(item.image)} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>{item.color}</p><strong>{money(item.price)}</strong><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div></div><button className="remove-item" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></div>)}</div><div className="cart-summary"><p><span>Subtotal</span><strong>{money(cartTotal)}</strong></p><small>Shipping and taxes calculated at checkout.</small><button className="checkout-button" onClick={checkout}>Continue to checkout <ArrowRight size={16} /></button></div></> : <div className="empty-cart"><ShoppingBag size={32} /><h3>Your bag is taking a breather.</h3><p>Find something you’ll love wearing.</p><button className="dark-button" onClick={() => setCartOpen(false)}>Explore the collection</button></div>}
      </aside></div>}
    </>
  );
}

function NewsletterForm({ setNotice }) {
  const [email, setEmail] = useState("");
  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setNotice(`Thanks! ${email} has been added to this demo newsletter.`);
    setEmail("");
    window.setTimeout(() => setNotice(""), 3500);
  }
  return <form className="newsletter-form" onSubmit={submit}><input aria-label="Email address" type="email" placeholder="Your email address" required value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Sign me up <ArrowRight size={16} /></button></form>;
}