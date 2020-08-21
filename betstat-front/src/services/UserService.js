export async function getAllUsers() {

    const response = await fetch('/api/users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

export async function scrapData() {
    const res = await fetch(`/api/betdata`, {
        headers : { 'Content-Type': 'application/json'}
        });
  
      
    // const res = await fetch('/').then(res => res.json()).then(data => console.log(data));
    return res.json();
}