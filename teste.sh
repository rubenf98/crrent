curl --request POST \
     --url https://clientes.eupago.pt/api/v1.02/creditcard/create \
     --header 'Authorization: ApiKey e50f-062e-e91a-118e-d72a' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
     "payment": {
          "amount": {
               "currency": "EUR",
               "value": 100
          },
          "lang": "PT",
          "successUrl": "http://localhost:8000/",
          "failUrl": "http://localhost:8000/",
          "backUrl": "http://localhost:8000/"
     },
     "customer": {
          "notify": true,
          "email": "teste@teste.com"
     }
}
'
