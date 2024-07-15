fetch ('https://api.mercadolibre.com/sites/MLA/search?q=teclados')
    .then(res => res.json())
    .then(data => {
        data.results.forEach(product => {
            const markup = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.seller.nickname}</td>
                    <td>$${product.price}</td>
                    <td>${product.currency_id}</td>
                    <td>${product.condition}</td>
                    <td>${product.available_quantity}</td>
                    <td> <img src="${product.thumbnail}"> </td>
                    <td> <a href="${product.permalink}"><i class="fa-solid fa-arrow-up-right-from-square icon"></i></a> </td>
                </tr>
            `
            document.querySelector('tbody').insertAdjacentHTML('beforeend', markup);
        });

        new DataTable('#mainTable', {
                columnDefs: [
                    {className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8]},
                    {orderable: false, targets: [4, 7, 8]}
                ]
            }
        )
    })
    .catch(err => console.error(err))
