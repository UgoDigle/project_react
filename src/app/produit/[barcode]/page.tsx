"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css';

export function Photo({ src }) {
  return (
    <div>
      <Image src={src} alt="Photo du produit" width={200} height={300} />
    </div>
  );
}

export default function Product({ params: { barcode } }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=labels,generic_name,ingredients_text,nutriments,product_name,ecoscore_grade,nutriscore_grade,image_front_url,nova_group`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [barcode]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <main>
    <div className="container flex-shrink-0">
      <div className="row">
        <div className="col-12 col-md-3 offset-md-1 text-center">
        <Photo
              id="img_prod"
              className="img-fluid"
              // className={styles.produit}
              src={product ? `${product.image_front_url}` : ""}
              alt="Photo du produit"
              width={200}
              height={300}
            />
          <p className="nom_du_produit">{product.product_name}</p>
          <div className="description_produit text-start">
            <h4 className="text-decoration-underline">Description du produit</h4>
            <p>{product.generic_name}</p>
          </div>
        </div>
        <div className="col-12 offset-md-1 col-md-6 icones">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
              <h4 className="text-decoration-underline">Scores</h4>
              <img
                className="nutriscore mb-3 img-fluid"
                src={`/Nutri-score/Nutri-score-${product.nutriscore_grade}.svg`}
                alt="nutri-score C"
              />
              <br />
              <img
                className="novascore mb-3 img-fluid"
                src={`/Nova-score/NOVA-group-${product.nova_group}.svg`}
                alt="groupe NOVA 3"
              />
              <br />
              <img className="ecoscore mb-3 img-fluid" src={`/Eco-score/Eco-score-${product.ecoscore_grade}.svg`} alt="Eco-Score A" />
            </div>
            <div className="col-12 col-md-6 text-center h-50">
              <h4 id="labels" className="text-decoration-underline">Labels</h4>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="liste_ingredients col-md-3 offset-md-1 col-12">
            <h4 className="text-decoration-underline">Liste d'ingrédients</h4>
            <p>
            {product.ingredients_text}
            </p>
          </div>
          <div className="col-12 offset-md-1 col-md-6">
            <h4 className="text-decoration-underline">Tableau nutritionnel</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" colSpan={2} >Tel que vendu pour 100 g / 100 ml</th>
                </tr>
              </thead>
              <tbody>
                <tr id="energie">
                  <th scope="row">Energie</th>
                  <td className="quantite">{product.nutriments["energy-kcal_value"]}</td>
                  <td className="unite">{product.nutriments["energy-kcal_unit"]}</td>
                </tr>
                <tr id="matieres_grasses">
                  <th scope="row">Matières grasses</th>
                  <td className="quantite">{product.nutriments["fat_value"]}</td>
                  <td className="unite">{product.nutriments["fat_unit"]}</td>
                </tr>
                <tr id="acides_gras_satures">
                  <th scope="row">&nbsp;dont acides gras saturés</th>
                  <td className="quantite">{product.nutriments["saturated-fat_value"]}</td>
                  <td className="unite">{product.nutriments["saturated-fat_unit"]}</td>
                </tr>
                <tr id="glucides">
                  <th scope="row">Glucides</th>
                  <td className="quantite">{product.nutriments["carbohydrates_value"]}</td>
                  <td className="unite">{product.nutriments["carbohydrates_unit"]}</td>
                </tr>
                <tr id="sucres">
                  <th scope="row">&nbsp;dont sucres</th>
                  <td className="quantite">{product.nutriments["sugars_value"]}</td>
                  <td className="unite">{product.nutriments["sugars_unit"]}</td>
                </tr>
                <tr id="fibres_alimentaires">
                  <th scope="row">Fibres alimentaires</th>
                  <td className="quantite">{product.nutriments["fiber_value"]}</td>
                  <td className="unite">{product.nutriments["fiber_unit"]}</td>
                </tr>
                <tr id="proteines">
                  <th scope="row">Protéines</th>
                  <td className="quantite">{product.nutriments["proteins_value"]}</td>
                  <td className="unite">{product.nutriments["proteins_unit"]}</td>
                </tr>
                <tr id="sel">
                  <th scope="row">Sel</th>
                  <td className="quantite">{product.nutriments["salt_value"]}</td>
                  <td className="unite">{product.nutriments["salt_unit"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
