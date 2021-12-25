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

const randomUserList = (n) => {
    if (n <= 0) return [];
    const userList = [];

    Array.from(new Array(n)).forEach(() => {
        const user = {
            idCard: faker.datatype.uuid(),
            name: faker.name.firstName(),
            birthDate: "00/00/00",
            gender: faker.name.gender(),
            country: faker.address.country(),
            hometown: faker.address.city(),
            permanentAddress: address = faker.address.streetAddress(),
            temporaryAddress: address,
            religion: "không",
            educationalLevel: faker.random.arrayElement(["High School", "Ungraduated", "Graduated"]),
            career: faker.name.jobType(),
            role: faker.random.arrayElement(["A1", "A2", "A3", "B1", "B2", "citizen"]),
        }
        let addtional = {
            username: null, password: null
        }

        if (user.role !== "citizen") {
            addtional = { username: `${user.role}-${user.id}`, password: "password" }
        }

        const newUser = {
            ...user,
            ...addtional
        }
        userList.push(newUser);
    })
    const adminUser = {
        idCard: faker.datatype.uuid(),
        name: faker.name.firstName(),
        birthDate: "00/00/00",
        gender: faker.name.gender(),
        country: faker.address.country(),
        hometown: faker.address.city(),
        permanentAddress: faker.address.streetAddress(),
        temporaryAddress: faker.address.streetAddress(),
        religion: "không",
        educationalLevel: faker.random.arrayElement(["High School", "Ungraduated", "Graduated"]),
        career: faker.name.jobType(),
        role: "admin",
        username: "admin",
        password: "admin"
    }
    userList.push(adminUser);

    return userList;
}

const categoryList = randomeCategoryList(4);
const productList = randomProductList(categoryList, 5);
const userList = randomUserList(10);

(() => {

    const db = {
        categories: categoryList,
        products: productList,
        users: userList
    }

    fs.writeFile('./db.json', JSON.stringify(db), () => {
        console.log("Succesfully")
    })
})()