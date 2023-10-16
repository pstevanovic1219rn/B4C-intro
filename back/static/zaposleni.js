function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    /*fetch('http://127.0.0.1:8000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            });
        });*/
    fetch('http://127.0.0.1:8000/api/authors', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('authLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, LastName: ${el.lastName}, Phone: ${el.phone}</li>`;
            });
        });

        document.getElementById('delete').addEventListener('click', e => {
            e.preventDefault();
    
            const id = document.getElementById('authorID').value;
    
            fetch('http://127.0.0.1:8000/api/authors/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.author) {
                        alert(el.author);
                    } else {
                    }
                });
                window.location.reload();
        });

    document.getElementById('authBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value
        };

        document.getElementById('name').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('phone').value = '';
        fetch('http://127.0.0.1:8000/api/authors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.author) {
                    alert(el.author);
                } else {
                    document.getElementById('authLst').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, LastName: ${el.lastName}, Phone: ${el.phone} </li>`;
                }
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}