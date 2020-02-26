const axios = require('axios')
const url = 'https://jsonmock.hackerrank.com/api/medical_records?page=';
const DEBUG = true;


// Get all data - from all pages
async function getAllData() {
    let records = [];
    let currentPage = 1;
    let page = {total_pages: 10};
    while (currentPage <= page.total_pages) {
        const result = await axios.get(url + currentPage);
        page = result.data;
        records = records.concat(page.data);
        currentPage++;
    }
    return records;
}

// In all the records search for age between ageStart and ageEnd where bfDiff is > than the given
function findRecordsWith(records, bpDiff, ageStart, ageEnd) {
    console.log(records.length)
    // compute bpDiff & age at the time of checkup
    records.map(record => {
        record.bpDiff = record.vitals.bloodPressureDiastole - record.vitals.bloodPressureSystole;
        const parts = record.userDob.split('-') // DD-MM-YYYY
        record.dobTimestamp = (new Date(Date.UTC(parts[2], parts[1], parts[0]))).getTime();
        record.age = Math.floor((Math.abs(record.timestamp - record.dobTimestamp)) / (60 * 60 * 24 * 365 * 1000))
        record.checkup_date = new Date(record.timestamp)
        return record;
    });

    const searched = []
    records.forEach(r => {
        if (ageStart < r.age && r.age < ageEnd && r.bpDiff > bpDiff) {
            if (DEBUG) {
                searched.push({
                    id: r.id,
                    age: r.age,
                    bpDiff: r.bpDiff,
                    //checkup_date : r.checkup_date
                })
            } else {
                searched.push(r.id)
            }
        }
    });
    if(DEBUG) {
        console.log('Found: ', JSON.stringify(searched))
    } else {
        return searched;
    }
}

getAllData().then(r => findRecordsWith(r, 63, 28, 30))

// Run as node index.js
