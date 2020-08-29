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
    return res.json();
}

export async function betdatas() {

    const response = await fetch('/api/betdatas');
    return await response.json();
}

export async function overall() {

    const response = await fetch('/api/matchID');
    return await response.json();
}