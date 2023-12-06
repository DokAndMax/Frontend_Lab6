"use strict";

const cardTemplate = {
    "location.postcode": "Поштовий індекс",
    "location.coordinates": "Місцезнаходження",
    "email": "Електронна пошта",
    "location.city": "Місто",
}

const downloadCardsButton = document.getElementById("download-cards");
downloadCardsButton.addEventListener("click", OnClickDownloadCards)

async function OnClickDownloadCards(event) {
    const CARDS_API_URI = "https://randomuser.me/api";
    const CARDS_COUNT = "5";

    const url = new URL(CARDS_API_URI);
    url.searchParams.append("results", CARDS_COUNT);

    const response = await fetch(url);
    const responseJSON = await response.json();
    const cardsData = responseJSON.results;

    const container = document.getElementById("card-list");

    for (let data of cardsData) {
        let card = generateCard(data);
        container.appendChild(card);
    }
}

function generateCard(data) {
    const card = document.createElement("div");
    card.className = "card";

    if (data.picture) {
        let image = document.createElement("img");
        image.className = "card-image";
        image.src = data.picture.large;
        card.appendChild(image);
    }

    for (let key of Object.keys(cardTemplate)) {
        let value = getNestedValue(data, key);
        let label = cardTemplate[key];
        let field = createCardField(label, value);
        card.appendChild(field);
    }

    return card;
}

function createCardField(label, value) {
    let field = document.createElement("div");
    field.className = "card-field";

    let fieldLabel = document.createElement("b");
    fieldLabel.className = "card-label";
    fieldLabel.textContent = label + ": ";
    field.appendChild(fieldLabel);

    let fieldValue = document.createElement("span");
    fieldValue.textContent = value;
    field.appendChild(fieldValue);

    return field;
}

function getNestedValue(obj, path) {
    let keys = path.split(".");
    let value = obj;
    for (let key of keys) {
        value = value[key];
    }
    return value;
}