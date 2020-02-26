const axios = require('axios')

const url = 'https://jsonmock.hackerrank.com/api/medical_records?page=1';
console.log(url);
let records = [];

async function getAllData() {
    console.log('in0')
    const data = await axios.get(url);
        //.then(data => data.data);

    records = records + data.data;
    console.log('LEN: ', data.data);
    console.log('in')
    return data;
}

function f() {
    return new Promise((resolve, reject) => {
        resolve(1111);
    });
}

const data =  getAllData().then(d => console.log('getAll:', d.data));
console.log('out')

f().then(r => console.log('promise:', r));

async function f2() {
    return await f();
}
const d = f2()
console.log('d', d)
