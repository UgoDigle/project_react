"use client";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';


interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children}: RootLayoutProps) {
  const router = useRouter();
  const [barcode, setBarcode] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json?fields=labels,generic_name,ingredients_text,nutriments,product_name,ecoscore_grade,nutriscore_grade,image_front_url,nova_group`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
        router.push(`/produit/${barcode}`)
    };
  return (
  <html lang="fr">
  <head>
    <meta charSet="UTF-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Gérard vous cherche le produit correspondant à un code-barre. Il est vraiment sympa Gérard!"/>
    <title>Gérard le code-barre</title>
  </head>    
  <body>
  <header>
      <nav className="navbar sticky-top">
        <div className="container-fluid mt-3 mx-3">
          <a className="navbar-brand" href="../">
            <Image src="/aubergine.webp" alt="logo yugo" width={50} height={75} />
          </a>
          <form className="d-flex col-md-6 col-7" onSubmit={handleSubmit} role="search">
            <input
              id="searchInput"
              className="form-control me-2"
              type="search"
              placeholder="Numéro de code-barres"
              aria-label="Search"
              name="barcode"
              value={barcode}
              onChange={(event) => setBarcode(event.target.value)}
            />
            <button className="btn btn-outline-success bouton2 me-2" type="submit">Go!</button>
          </form>
          <a className="navbar-brand" href="/help">
            <Image src="/question.svg" alt="aide" width={50} height={50}/>
          </a>
        </div>
      </nav>
    </header>
    {children}
    </body>  
  </html>    
  )
}