import { http, HttpResponse } from 'msw'

export const handlers = [

    http.get('localhost:3000/community',()=>{
        return HttpResponse.json([{
            "id": "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
            "avatar": "http://localhost:3000/avatars/avatar1.png",
            "firstName": "Mary",
            "lastName": "Smith",
            "position": "Lead Designer at Company Name"
        },
        {
            "id": "1157fea1-8b72-4a9e-b253-c65fa1556e26",
            "avatar": "http://localhost:3000/avatars/avatar2.png",
            "firstName": "Bill",
            "lastName": "Filler",
            "position": "Lead Engineer at Company Name"
        }])
    })
]