const faker = require('faker');
const fs = require('fs');

//set locale to use vietnamese
faker.locale = 'vi';

//Random data source

const randomeCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()

        }

        categoryList.push(category);

        return categoryList;
    })

    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumailUrl: faker.image.imageUrl(400, 400),
                categoryId: category.id
            }
            productList.push(product);
        })
    }
    return productList;
}

const categoryList = randomeCategoryList(4);
const productList = randomProductList(categoryList, 5);

(() => {

    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Po"
        }
    }

    fs.writeFile('./db.json', JSON.stringify(db), () => {
        console.log("Succesfully")
    })
})()