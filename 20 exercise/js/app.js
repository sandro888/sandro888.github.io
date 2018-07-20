function aclean(arr){
let map =new Map();

for(let i of arr){
    let filter =i.toLowerCase().split("").sort().join();
    map.set(filter,i);
}

return Array.from(map.values());
}

let arr =["nap", "teachers", "hectares","cheaters", "PAN", "ear", "era"];
alert(aclean(arr));