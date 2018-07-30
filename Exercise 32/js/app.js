function delay(ms) {
    let time = new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000);
    });return time
    
    }
delay(3000).then(() => alert('runs after 3 seconds'));