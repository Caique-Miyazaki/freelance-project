import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="about-section">
          <h1>Sobre</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
            ipsum odit unde quae eveniet recusandae voluptas alias minus
            consequuntur beatae. Esse ab, blanditiis possimus commodi atque
            adipisci voluptatibus quia eius.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
            ipsum odit unde quae eveniet recusandae voluptas alias minus
            consequuntur beatae. Esse ab, blanditiis possimus commodi atque
            adipisci voluptatibus quia eius.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
            ipsum odit unde quae eveniet recusandae voluptas alias minus
            consequuntur beatae. Esse ab, blanditiis possimus commodi atque
            adipisci voluptatibus quia eius.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-item">
            <h2>Contato</h2>
            <p>11 9999999</p>
          </div>
          <div className="footer-item">
            <h2>Localização</h2>
            <p>Rua: blablabla</p>
            <p>Numero:0000</p>
            <p>CEP:0000000</p>
          </div>
          <div className="footer-item">
            <h2>Doações</h2>
            <p> Pix: 20000000</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
