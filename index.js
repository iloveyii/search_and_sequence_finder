const axios = require('axios')

const url = 'https://jsonmock.hackerrank.com/api/medical_records?page=';
console.log(url);
const record = {
    userDob: '03-05-1980',
    currentTs : Date.now(),
    currentTsYears : Date.now()/ (60*60*24*365*1000),
    simpler: 2020 - 1970
}
const parts = record.userDob.split('-') // DD-MM-YYYY
record.dobTimestamp = Math.floor((new Date(Date.UTC(parts[2], parts[1], parts[0]))).getTime() / (60*60*24*365*1000));
// record.dobTimestamp = Math.floor(((new Date('1980-05-03'))).getTime() / (60*60*24*365*1000));
record.diff = record.currentTs - record.dobTimestamp
record.human = (new Date(record.diff)).toGMTString()
console.log(record)

async function getAllData() {
    let records = [];
    console.log('in0');
    let currentPage = 1;
    let page = {total_pages: 10};
    while(currentPage <= page.total_pages) {
        const result = await axios.get(url+currentPage);
        //.then(data => data.data);
        // result.data
        /*
        page: '1',
        per_page: 10,
        total: 99,
        total_pages: 10,
        data:
         */
        page = result.data;
        records = records.concat(page.data);
        currentPage++;
    }
    //console.log('LEN: ', data.data);
    console.log('in');
    return records;
}

function findRecordsWith(records, bpDiff, ageStart, ageEnd) {
    console.log(records.length)
    // compute bpDiff & age at the time of checkup
    records.map(record => {
        record.bpDiff = record.vitals.bloodPressureDiastole - record.vitals.bloodPressureSystole;
        const parts = record.userDob.split('-') // DD-MM-YYYY
        record.dobTimestamp = (new Date(Date.UTC(parts[2], parts[1], parts[0]))).getTime();
        record.age = Math.floor((Math.abs(record.timestamp - record.dobTimestamp))/(60*60*24*365*1000))
        record.checkup_date = new Date(record.timestamp)
        return record;
    });

    const searched = []
    records.forEach(r => {
        if(ageStart < r.age && r.age < ageEnd && r.bpDiff > bpDiff) {
            searched.push({
                id: r.id,
                age: r.age,
                bpDiff: r.bpDiff
            })
        }
    });
    console.log('Found: ', searched)
}

getAllData().then(r => findRecordsWith(r, 63, 28, 30))
console.log('out');
