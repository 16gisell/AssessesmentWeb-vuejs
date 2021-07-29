class ListarService{
    constructor(){
        this.URI = "http://localhost:3000/api/users";
    }

    async getUsers(){
        const respuesta= await fetch(this.URI);
        const users =respuesta.json();
        return users;
    }
    async postUser(data){
        const res = await fetch(this.URI+'/cola', {
            method:'POST',
            body:data,
            headers:{
                'content-type': 'application/json'
            }
        });
        const user = await res.json();
        return user;
    }

    async deliteUser(id){
        const dele = await fetch(`${this.URI}/${id}`,{
            headers:{
                'content-type': 'application/json'
            },
            method:'DELETE'
        })
        const data = await dele.json();
        return data;
    }

    async putUser(id, dato){
        const res = await fetch('http://localhost:3000/api/users/'+id,{
            method:'PUT',
            body:dato,
            headers:{
                'content-type': 'application/json'
            }            
        })
        const data = await res;
        return data;
    }

    async getUserId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const users =respuesta.json();
        return users;
    }
}

export default ListarService