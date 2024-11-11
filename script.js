document.addEventListener('DOMContentLoaded', function () {
  // URL del fitxer XML al repositori GitHub
  const url = 'https://raw.githubusercontent.com/GSETUN14/CARTA/main/data.xml';

  // Funció per obtenir i parsejar l'XML
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP! Estat: ${response.status}`);
      }
      return response.text();
    })
    .then(str => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(str, "text/xml");

      // Creem el contenidor principal
      const menuContainer = document.getElementById('menu-container');

      // Iterem per cada grup (e.g., Hamburgueses, Pizzes, Pastas)
      const grups = xmlDoc.getElementsByTagName("grup");
      for (const grup of grups) {
        const grupNom = grup.getElementsByTagName("nom")[0].textContent;

        // Afegim el títol de la secció
        const wrapTitle = document.createElement('div');
        wrapTitle.classList.add('wrap-title-section');
        const h2 = document.createElement('h2');
        h2.textContent = grupNom;
        wrapTitle.appendChild(h2);
        menuContainer.appendChild(wrapTitle); // Afegir a la secció de menú

        // Creem la secció de plats
        const carta = document.createElement('div');
        carta.classList.add('wrap', 'column-2', 'carta');

        // Iterem per cada plat del grup
        const plats = grup.getElementsByTagName("plat");
        for (const plat of plats) {
          const platNom = plat.getElementsByTagName("nom")[0].textContent;
          const platImg = plat.getElementsByTagName("img")[0].textContent;
          const platDescripcio = plat.getElementsByTagName("descripcio")[0].textContent;
          const platPreu = plat.getElementsByTagName("preu")[0].textContent;

          // Creem el bloc per cada plat
          const platElement = document.createElement('div');
          platElement.classList.add('plato-carta');

          const imgContainer = document.createElement('div');
          imgContainer.classList.add('img-plato-carta');
          const img = document.createElement('img');
          img.src = platImg;
          img.alt = platNom; // Alt per accessibilitat
          imgContainer.appendChild(img);

          const titleContainer = document.createElement('div');
          titleContainer.classList.add('title-plato-carta');
          const h4 = document.createElement('h4');
          h4.textContent = platNom;
          const p = document.createElement('p');
          p.textContent = platDescripcio;
          titleContainer.appendChild(h4);
          titleContainer.appendChild(p);

          const priceContainer = document.createElement('div');
          priceContainer.classList.add('precio-plato-carta');
          const span = document.createElement('span');
          span.textContent = platPreu;
          priceContainer.appendChild(span);

          // Afegim les parts del plat al bloc
          platElement.appendChild(imgContainer);
          platElement.appendChild(titleContainer);
          platElement.appendChild(priceContainer);

          // Afegim el plat a la carta
          carta.appendChild(platElement);
        }

        // Afegim la carta al contenidor de menú
        menuContainer.appendChild(carta);
      }
    })
    .catch(error => {
      console.error('Error al carregar l\'XML:', error);
    });
});
