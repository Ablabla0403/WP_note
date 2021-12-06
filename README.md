# WP_note
## Introduction to backend
### Promise 
For asynchronous funtion. Three situations: Pending, Resolved, Rejected, use .then( .catch() function
```
const momHappy = (phone) => {...}
const momUnhappy = (reason) => {...}
let willIGetNewPhone = new Promise((resolve, reject) => {
  if (isMomHappy) {
    const phone = getNewPhone();
    resolve(phone);
  } else {
    const reason = "...";
    reject(reason);
  }
});
willIGetNewPhone .then(momHappy) .catch(momUnhappy); 
```
